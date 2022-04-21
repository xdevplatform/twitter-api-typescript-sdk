// Copyright 2021 Twitter, Inc.
// SPDX-License-Identifier: Apache-2.0

export type SuccessStatus = 200 | 201;
export type ResponseType = "application/json";

export interface AuthHeader {
  Authorization: string;
}

export abstract class AuthClient {
  abstract getAuthHeader(
    url?: string,
    method?: string
  ): Promise<AuthHeader> | AuthHeader;
}

export interface TwitterNextToken {
  meta?: { next_token?: string };
}
export interface TwitterPaginatedResponse<T extends TwitterNextToken>
  extends AsyncIterable<T> {
  then(
    resolve: ((value: T) => T | PromiseLike<T>) | null | undefined,
    reject: ((reason: any) => T | PromiseLike<T>) | null | undefined
  ): Promise<T>;
}

// https://stackoverflow.com/a/50375286
export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export type GetSuccess<T> = {
  [K in SuccessStatus & keyof T]: GetContent<T[K]>;
}[SuccessStatus & keyof T];

export type TwitterResponse<T> = UnionToIntersection<ExtractTwitterResponse<T>>;

export type GetContent<T> = "content" extends keyof T
  ? ResponseType extends keyof T["content"]
    ? T["content"][ResponseType]
    : never
  : never;

export type ExtractTwitterResponse<T> = "responses" extends keyof T
  ? GetSuccess<T["responses"]>
  : never;

export type TwitterParams<T> = "parameters" extends keyof T
  ? "query" extends keyof T["parameters"]
    ? T["parameters"]["query"]
    : never
  : never;

export type TwitterPath<T> = "parameters" extends keyof T
  ? "path" extends keyof T["parameters"]
    ? T["parameters"]["path"]
    : never
  : never;

export type TwitterBody<T> = "requestBody" extends keyof T
  ? "content" extends keyof T["requestBody"]
    ? ResponseType extends keyof T["requestBody"]["content"]
      ? T["requestBody"]["content"][ResponseType]
      : never
    : never
  : never;

export * from "./gen/openapi-types";
