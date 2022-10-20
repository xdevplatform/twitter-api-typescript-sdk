// Copyright 2021 Twitter, Inc.
// SPDX-License-Identifier: Apache-2.0

import fetch from "node-fetch";
import type { RequestInfo, RequestInit, Response, Headers } from "node-fetch";
import { buildQueryString } from "./utils";
import {
  AuthClient,
  TwitterNextToken,
  TwitterPaginatedResponse,
} from "./types";
import type { AbortController as AbortControllerPolyfill } from "abort-controller";

let AbortController:
  | typeof globalThis.AbortController
  | typeof AbortControllerPolyfill;

if (!globalThis.AbortController) {
  AbortController = require("abort-controller");
} else {
  // https://nodejs.org/api/globals.html#class-abortcontroller
  // AbortController available in v14.17.0 as experimental
  AbortController = globalThis.AbortController;
}

export interface RequestOptions extends Omit<RequestInit, "body"> {
  auth?: AuthClient;
  endpoint: string;
  params?: Record<string, any>;
  request_body?: Record<string, any>;
  method?: string;
  max_retries?: number;
  base_url?: string;
}

async function fetchWithRetries(
  url: RequestInfo,
  init: RequestInit,
  max_retries = 0
): Promise<Response> {
  const res = await fetch(url, init);
  if (res.status === 429 && max_retries > 0) {
    const rateLimitReset = Number(res.headers.get("x-rate-limit-reset"));
    const rateLimitRemaining = Number(res.headers.get("x-rate-limit-remaining"));
    const timeTillReset = rateLimitReset * 1000 - Date.now();
    let timeToWait = 1000;
    if (rateLimitRemaining === 0)
      timeToWait = timeTillReset;
    await new Promise((resolve) => setTimeout(resolve, timeToWait));
    return fetchWithRetries(url, init, max_retries - 1);
  }
  return res;
}

class TwitterResponseError extends Error {
  status: number;
  statusText: string;
  headers: Record<string, any>;
  error: Record<string, any>;
  constructor(
    status: number,
    statusText: string,
    headers: Headers,
    error: Record<string, any>
  ) {
    super();
    this.status = status;
    this.statusText = statusText;
    this.headers = Object.fromEntries(headers);
    this.error = error;
  }
}

export async function request({
  auth,
  endpoint,
  params: query = {},
  request_body,
  method,
  max_retries,
  base_url = "https://api.twitter.com",
  headers,
  ...options
}: RequestOptions): Promise<Response> {
  const url = new URL(base_url + endpoint);
  url.search = buildQueryString(query);
  const includeBody = (method === "POST" || method === "PUT") && !!request_body;
  const authHeader = auth
    ? await auth.getAuthHeader(url.href, method)
    : undefined;
  const response = await fetchWithRetries(
    url.toString(),
    {
      headers: {
        ...(includeBody
          ? { "Content-Type": "application/json; charset=utf-8" }
          : undefined),
        ...authHeader,
        ...headers,
      },
      method,
      body: includeBody ? JSON.stringify(request_body) : undefined,
      // Timeout if you don't see any data for 60 seconds
      // https://developer.twitter.com/en/docs/tutorials/consuming-streaming-data
      timeout: 60000,
      ...options,
    },
    max_retries
  );
  if (!response.ok) {
    const error = await response.json();
    throw new TwitterResponseError(
      response.status,
      response.statusText,
      response.headers,
      error
    );
  }
  return response;
}

export async function* stream<T>(args: RequestOptions): AsyncGenerator<T> {
  const controller = new AbortController();
  const { body } = await request({
    signal: controller.signal as RequestInit["signal"],
    ...args,
  });
  if (body === null) throw new Error("No response returned from stream");
  let buf = "";
  try {
    for await (const chunk of body) {
      buf += chunk.toString();
      const lines = buf.split("\r\n");
      for (const [i, line] of lines.entries()) {
        if (i === lines.length - 1) {
          buf = line;
        } else if (line) yield JSON.parse(line);
      }
    }
  } finally {
    controller.abort();
  }
}

export async function rest<T = Record<string, any>>(
  args: RequestOptions
): Promise<T> {
  const response = await request(args);
  return response.json();
}

export function paginate<T extends TwitterNextToken>(
  args: RequestOptions
): TwitterPaginatedResponse<T> {
  return {
    then(resolve, reject) {
      return rest<T>(args).then(resolve, reject);
    },
    async *[Symbol.asyncIterator](): AsyncIterator<T> {
      let ended = false;
      let pagination_token: string | undefined;
      while (!ended) {
        const response = await rest<T>({
          ...args,
          params: {
            ...args.params,
            ...(pagination_token && { pagination_token }),
          },
        });
        yield response;
        pagination_token = response?.meta?.next_token;
        if (!pagination_token) {
          ended = true;
        }
      }
    },
  };
}
