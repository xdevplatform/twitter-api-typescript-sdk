// Copyright 2021 Twitter, Inc.
// SPDX-License-Identifier: Apache-2.0

import fetch, { RequestInfo, RequestInit, Response } from "node-fetch";
import { buildQueryString } from "./utils";
import {
  AuthClient,
  TwitterNextToken,
  TwitterPaginatedResponse,
} from "./types";

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
    const timeTillReset = rateLimitReset * 1000 - Date.now();
    await new Promise((resolve) => setTimeout(resolve, timeTillReset));
    return fetchWithRetries(url, init, max_retries - 1);
  }
  return res;
}

export async function request({
  auth,
  endpoint,
  params: query = {},
  request_body,
  method,
  max_retries,
  base_url: baseUrl = "https://api.twitter.com",
  ...options
}: RequestOptions): Promise<Response> {
  const url = new URL(baseUrl + endpoint);
  url.search = buildQueryString(query);
  const isPost = method === "POST" && !!request_body;
  const authHeader = auth
    ? await auth.getAuthHeader(url.href, method)
    : undefined;
  const response = await fetchWithRetries(
    url.toString(),
    {
      ...options,
      headers: {
        ...options.headers,
        "User-Agent": `twitter-api-typescript-sdk/1.0.0`,
        ...(isPost
          ? { "Content-Type": "application/json; charset=utf-8" }
          : undefined),
        ...authHeader,
      },
      method,
      body: isPost ? JSON.stringify(request_body) : undefined,
    },
    max_retries
  );
  if (!response.ok) {
    throw new Error(`${response.status}, ${response.statusText}`);
  }
  return response;
}

export async function* stream<T>(args: RequestOptions): AsyncGenerator<T> {
  const { body } = await request(args);
  if (body === null) throw new Error("No response returned from stream");
  let buf = "";
  for await (const chunk of body) {
    buf += chunk.toString();
    const lines = buf.split("\r\n");
    for (const [i, line] of lines.entries()) {
      if (i === lines.length - 1) {
        buf = line;
      } else if (line) yield JSON.parse(line);
    }
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
