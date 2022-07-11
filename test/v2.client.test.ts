// Copyright 2021 Twitter, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Client } from "../src";
import nock from "nock";
import Stream from "stream";

describe("test v2 client", () => {
  let client: Client;

  beforeEach(() => {
    client = new Client("bearer-token");
  });

  test("rest api call", () => {
    nock("https://api.twitter.com", {
      reqheaders: {
        'User-Agent': /^twitter-api-typescript-sdk/
      }
    })
      .get("/2/tweets/20")
      .reply(200, { data: { id: "20", text: "just setting up my twttr" } });
    return client.tweets.findTweetById("20").then((tweet) =>
      expect(tweet?.data).toEqual({
        id: "20",
        text: "just setting up my twttr",
      })
    );
  });

  test("stream api call", async () => {
    const readableStream = new Stream.Readable({
      objectMode: true,
      read: () => undefined,
    });
    readableStream.push(
      JSON.stringify({ data: { id: "20", text: "just setting up my twttr" } }) +
        "\r\n"
    );
    nock("https://api.twitter.com")
      .get("/2/tweets/sample/stream")
      .reply(200, () => readableStream);
    const stream = client.tweets.sampleStream();
    for await (const item of stream) {
      return expect(item).toEqual({
        data: { id: "20", text: "just setting up my twttr" },
      });
    }
  });

  test("paginated api call", async () => {
    nock("https://api.twitter.com")
      .get("/2/users/TwitterDev/followers")
      .reply(200, { data: {}, meta: { next_token: "test-next-token" } });

    nock("https://api.twitter.com")
      .get("/2/users/TwitterDev/followers")
      .query({ pagination_token: "test-next-token" })
      .reply(200, { data: {} });

    const pages = client.users.usersIdFollowers("TwitterDev");

    const results: Awaited<ReturnType<typeof pages["then"]>>[] = [];
    for await (const test of pages) {
      results.push(test);
    }
    expect(results).toEqual([
      { data: {}, meta: { next_token: "test-next-token" } },
      { data: {} },
    ]);
  });
});
