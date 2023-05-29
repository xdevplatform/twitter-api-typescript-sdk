// Copyright 2021 Twitter, Inc.
// SPDX-License-Identifier: Apache-2.0

// https://stackoverflow.com/a/62969380
export function buildQueryString(query: Record<string, any>): string {
  return Object.entries(query)
    .map(([key, value]) =>
      key && value
        ? `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        : ""
    )
    .join("&");
}

export function base64Encode(byteValues: Uint8Array): string {
  return btoa([...byteValues].map(byteValue => String.fromCharCode(byteValue)).join(''))
}

export function basicAuthHeader(client_id: string, client_secret: string) {
  return `Basic ${base64Encode(new TextEncoder().encode(`${client_id}:${client_secret}`))}`
}
