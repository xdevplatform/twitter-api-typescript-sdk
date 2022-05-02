// Copyright 2021 Twitter, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Client } from "twitter-api-sdk";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const client = new Client(process.env.BEARER_TOKEN as string);
  await client.tweets.addOrDeleteRules(
    {
      add: [
        { value: "cat has:media", tag: "cats with media" },
        { value: "cat has:media -grumpy", tag: "happy cats with media" },
        { value: "meme", tag: "funny things" },
        { value: "meme has:images" },
      ],
    }
  );
  const rules = await client.tweets.getRules();
  console.log(rules);
  const stream = client.tweets.searchStream({
    "tweet.fields": ["author_id", "geo"],
  });
  for await (const tweet of stream) {
    console.log(tweet.data?.author_id);
  }
}

main();
