// Copyright 2021 Twitter, Inc.
// SPDX-License-Identifier: Apache-2.0

import crypto from "crypto";
import { buildQueryString, basicAuthHeader } from "./utils";
import { AuthClient, AuthHeader } from "./types";
import { rest } from "./request";

export type OAuth2Scopes =
  | "tweet.read"
  | "tweet.write"
  | "tweet.moderate.write"
  | "users.read"
  | "follows.read"
  | "follows.write"
  | "offline.access"
  | "space.read"
  | "mute.read"
  | "mute.write"
  | "like.read"
  | "like.write"
  | "list.read"
  | "list.write"
  | "block.read"
  | "block.write";

export type OAuth2UserOptions = {
  client_id: string;
  client_secret: string;
  callback: string;
  scopes: OAuth2Scopes[];
};

function sha256(buffer: string) {
  return crypto.createHash("sha256").update(buffer).digest();
}

function base64URLEncode(str: Buffer) {
  return str
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

export class OAuth2User implements AuthClient {
  #access_token?: string;
  token_type?: string;
  expires_at?: Date;
  scope?: string;
  refresh_token?: string;
  #configuration: OAuth2UserOptions;
  #code_verifier?: string;
  #code_challenge?: string;
  constructor(configuration: OAuth2UserOptions) {
    this.#configuration = configuration;
  }

  async refreshAccessToken() {
    const refresh_token = this.refresh_token;
    const credentials = this.#configuration;
    const params = {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    };
    const data = await rest({
      endpoint: `/2/oauth2/token`,
      params: params,
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        Authorization: basicAuthHeader(
          credentials.client_id,
          credentials.client_secret
        ),
      },
    });
    this.updateToken(data);
  }

  updateToken(data: Record<string, any>) {
    this.refresh_token = data.refresh_token;
    this.#access_token = data.access_token;
    this.token_type = data.token_type;
    this.expires_at = new Date(Date.now() + data.expires_in * 1000);
    this.scope = data.scope;
  }

  isAccessTokenExpired() {
    const refresh_token = this.refresh_token;
    const expires_at = this.expires_at;
    return (
      !!refresh_token &&
      (!expires_at || expires_at <= new Date(Date.now() + 1000))
    );
  }

  async requestAccessToken(code?: string): Promise<void> {
    const credentials = this.#configuration;
    const code_verifier = this.#code_verifier || this.#code_challenge;
    const params = {
      code,
      grant_type: "authorization_code",
      code_verifier: code_verifier,
      client_id: credentials.client_id,
      redirect_uri: credentials.callback,
    };
    const data = await rest({
      endpoint: `/2/oauth2/token`,
      params: params,
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        Authorization: basicAuthHeader(
          credentials.client_id,
          credentials.client_secret
        ),
      },
    });
    this.updateToken(data);
  }

  async revokeAccessToken(): Promise<any> {
    const credentials = this.#configuration;
    const access_token = this.#access_token;
    const refresh_token = this.refresh_token;
    const configuration = this.#configuration;
    if (!access_token || !refresh_token)
      throw new Error("No access_token or refresh_token found");
    const useAccessToken = !!this.#access_token;
    const params = {
      token_type_hint: useAccessToken ? "access_token" : "refresh_token",
      token: useAccessToken ? access_token : refresh_token,
      client_id: configuration.client_id,
    };
    return rest({
      endpoint: `/2/oauth2/revoke`,
      params: params,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: basicAuthHeader(
          credentials.client_id,
          credentials.client_secret
        ),
      },
    });
  }

  generateAuthURL(
    options:
      | {
          state: string;
          code_challenge: string;
          code_challenge_method?: "plain";
        }
      | {
          state: string;
          code_challenge_method: "s256";
        }
  ): string {
    const credentials = this.#configuration;
    if (!("callback" in credentials))
      throw new Error("You need to provide a callback and scopes");
    if (options.code_challenge_method === "s256") {
      const code_verifier = base64URLEncode(crypto.randomBytes(32));
      this.#code_verifier = code_verifier;
      this.#code_challenge = base64URLEncode(sha256(code_verifier));
    } else {
      this.#code_challenge = options.code_challenge;
    }
    const code_challenge = this.#code_challenge;
    const url = new URL("https://twitter.com/i/oauth2/authorize");
    url.search = buildQueryString({
      ...options,
      client_id: credentials.client_id,
      scope: credentials.scopes.join(" "),
      response_type: "code",
      redirect_uri: credentials.callback,
      code_challenge_method: options.code_challenge_method || "plain",
      code_challenge,
    });
    return url.toString();
  }

  async getAuthHeader(): Promise<AuthHeader> {
    if (!this.#access_token) throw new Error("You do not have an access token");
    if (this.isAccessTokenExpired()) await this.refreshAccessToken();
    return {
      Authorization: `Bearer ${this.#access_token}`,
    };
  }
}
