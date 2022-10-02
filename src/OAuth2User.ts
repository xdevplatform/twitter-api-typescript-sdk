// Copyright 2021 Twitter, Inc.
// SPDX-License-Identifier: Apache-2.0

import crypto from "crypto";
import { buildQueryString, basicAuthHeader } from "./utils";
import { AuthClient, AuthHeader } from "./types";
import { RequestOptions, rest } from "./request";

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
  | "block.write"
  | "bookmark.read"
  | "bookmark.write";

export interface OAuth2UserOptions {
  /** Can be found in the developer portal under the header "Client ID". */
  client_id: string;
  /** If you have selected an App type that is a confidential client you will be provided with a “Client Secret” under “Client ID” in your App’s keys and tokens section. */
  client_secret?: string;
  /**Your callback URL. This value must correspond to one of the Callback URLs defined in your App’s settings. For OAuth 2.0, you will need to have exact match validation for your callback URL. */
  callback: string;
  /** Scopes allow you to set granular access for your App so that your App only has the permissions that it needs. To learn more about what scopes map to what endpoints, view our {@link https://developer.twitter.com/en/docs/authentication/guides/v2-authentication-mapping authentication mapping guide}. */
  scopes: OAuth2Scopes[];
  /** Overwrite request options for all endpoints */
  request_options?: Partial<RequestOptions>;
  /** Set the auth token */
  token?: Token;
}

export type GenerateAuthUrlOptions =
  | {
      /** A random string you provide to verify against CSRF attacks.  The length of this string can be up to 500 characters. */
      state: string;
      /** Specifies the method you are using to make a request (S256 OR plain). */
      code_challenge_method: "s256";
    }
  | {
      /** A random string you provide to verify against CSRF attacks.  The length of this string can be up to 500 characters. */
      state: string;
      /** A PKCE parameter, a random secret for each request you make. */
      code_challenge: string;
      /** Specifies the method you are using to make a request (S256 OR plain). */
      code_challenge_method?: "plain";
    };

export interface RevokeAccessTokenParams {
  token_type_hint: string;
  token: string;
  client_id: string;
}

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

interface RevokeAccessTokenResponse {
  revoked: boolean;
}

interface GetTokenResponse {
  /** Allows an application to obtain a new access token without prompting the user via the refresh token flow. */
  refresh_token?: string;
  /** Access tokens are the token that applications use to make API requests on behalf of a user.  */
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  /** Comma-separated list of scopes for the token  */
  scope?: string;
}

interface Token extends Omit<GetTokenResponse, "expires_in"> {
  /** Date that the access_token will expire at.  */
  expires_at?: number;
}

function processTokenResponse(token: GetTokenResponse): Token {
  const { expires_in, ...rest } = token;
  return {
    ...rest,
    ...(!!expires_in && {
      expires_at: Date.now() + expires_in * 1000,
    }),
  };
}

/**
 * Twitter OAuth2 Authentication Client
 */
export class OAuth2User implements AuthClient {
  token?: Token;
  #options: OAuth2UserOptions;
  #code_verifier?: string;
  #code_challenge?: string;
  constructor(options: OAuth2UserOptions) {
    const { token, ...defaultOptions } = options;
    this.#options = defaultOptions;
    this.token = token;
  }

  /**
   * Refresh the access token
   */
  async refreshAccessToken(): Promise<{ token: Token }> {
    const refresh_token = this.token?.refresh_token;
    const { client_id, client_secret, request_options } = this.#options;
    if (!client_id) {
      throw new Error("client_id is required");
    }
    if (!refresh_token) {
      throw new Error("refresh_token is required");
    }
    const data = await rest<GetTokenResponse>({
      ...request_options,
      endpoint: `/2/oauth2/token`,
      params: {
        client_id,
        grant_type: "refresh_token",
        refresh_token,
      },
      method: "POST",
      headers: {
        ...request_options?.headers,
        "Content-type": "application/x-www-form-urlencoded",
        ...(!!client_secret && {
          Authorization: basicAuthHeader(client_id, client_secret),
        }),
      },
    });
    const token = processTokenResponse(data);
    this.token = token;
    return { token };
  }

  /**
   * Check if an access token is expired
   */
  isAccessTokenExpired(): boolean {
    const refresh_token = this.token?.refresh_token;
    const expires_at = this.token?.expires_at;
    if (!expires_at) return true;
    return !!refresh_token && expires_at <= Date.now() + 1000;
  }

  /**
   * Request an access token
   */
  async requestAccessToken(code?: string): Promise<{ token: Token }> {
    const { client_id, client_secret, callback, request_options } =
      this.#options;
    const code_verifier = this.#code_verifier;
    if (!client_id) {
      throw new Error("client_id is required");
    }
    if (!callback) {
      throw new Error("callback is required");
    }
    const params = {
      code,
      grant_type: "authorization_code",
      code_verifier,
      client_id,
      redirect_uri: callback,
    };
    const data = await rest<GetTokenResponse>({
      ...request_options,
      endpoint: `/2/oauth2/token`,
      params,
      method: "POST",
      headers: {
        ...request_options?.headers,
        "Content-type": "application/x-www-form-urlencoded",
        ...(!!client_secret && {
          Authorization: basicAuthHeader(client_id, client_secret),
        }),
      },
    });
    const token = processTokenResponse(data);
    this.token = token;
    return { token };
  }

  /**
   * Revoke an access token
   */
  async revokeAccessToken(): Promise<RevokeAccessTokenResponse> {
    const { client_id, client_secret, request_options } = this.#options;
    const access_token = this.token?.access_token;
    const refresh_token = this.token?.refresh_token;
    if (!client_id) {
      throw new Error("client_id is required");
    }
    let params: RevokeAccessTokenParams;
    if (!!access_token) {
      params = {
        token_type_hint: "access_token",
        token: access_token,
        client_id,
      };
    } else if (!!refresh_token) {
      params = {
        token_type_hint: "refresh_token",
        token: refresh_token,
        client_id,
      };
    } else {
      throw new Error("access_token or refresh_token required");
    }
    return rest({
      ...request_options,
      endpoint: `/2/oauth2/revoke`,
      params,
      method: "POST",
      headers: {
        ...request_options?.headers,
        "Content-Type": "application/x-www-form-urlencoded",
        ...(!!client_secret && {
          Authorization: basicAuthHeader(client_id, client_secret),
        }),
      },
    });
  }

  generateAuthURL(options: GenerateAuthUrlOptions): string {
    const { client_id, callback, scopes } = this.#options;
    if (!callback) throw new Error("callback required");
    if (!scopes) throw new Error("scopes required");
    if (options.code_challenge_method === "s256") {
      const code_verifier = base64URLEncode(crypto.randomBytes(32));
      this.#code_verifier = code_verifier;
      this.#code_challenge = base64URLEncode(sha256(code_verifier));
    } else {
      this.#code_challenge = options.code_challenge;
      this.#code_verifier = options.code_challenge;
    }
    const code_challenge = this.#code_challenge;
    const url = new URL("https://twitter.com/i/oauth2/authorize");
    url.search = buildQueryString({
      ...options,
      client_id,
      scope: scopes.join(" "),
      response_type: "code",
      redirect_uri: callback,
      code_challenge_method: options.code_challenge_method || "plain",
      code_challenge,
    });
    return url.toString();
  }

  async getAuthHeader(): Promise<AuthHeader> {
    if (!this.token?.access_token) throw new Error("access_token is required");
    if (this.isAccessTokenExpired()) await this.refreshAccessToken();
    return {
      Authorization: `Bearer ${this.token.access_token}`,
    };
  }
}
