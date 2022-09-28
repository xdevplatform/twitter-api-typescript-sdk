// Copyright 2021 Twitter, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Client, auth } from "../dist";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const authClient = new auth.OAuth2User({
  client_id: process.env.CLIENT_ID as string,
  client_secret: process.env.CLIENT_SECRET as string,
  callback: "http://127.0.0.1:3000/callback",
  scopes: ["tweet.read", "users.read", "offline.access"],
});

const client = new Client(authClient);

const STATE = "my-state";

let token:auth.Token;

const generateUrlOptions: auth.GenerateAuthUrlOptions =  {
    state: STATE,
    code_challenge_method: "s256",
  };

app.get("/callback", async function (req, res) {
  try {
    const { code, state } = req.query;
    if (state !== STATE) return res.status(500).send("State isn't matching");
   token = await (await authClient.requestAccessToken(code as string)).token;
    res.redirect("/tweets");
  } catch (error) {
    console.log(error);
  }
});

app.get("/login", async function (req, res) {
  const authUrl = authClient.generateAuthURL(generateUrlOptions);
  res.redirect(authUrl);
});

app.get("/tweets", async function (req, res) {
  try {
    //create a new auth client with the previously generated token, (this token can be read from a database)
    const offlineAuthClient = new auth.OAuth2User({
        client_id: process.env.CLIENT_ID as string,
        client_secret: process.env.CLIENT_SECRET as string,
        callback: "http://127.0.0.1:3000/callback",
        scopes: ["tweet.read", "users.read", "offline.access"],
      },generateUrlOptions,token);
    //create a new twitter client with the auth client we created in the previous step
    const offlineClient = new Client(offlineAuthClient);
    //refresh the token (probably expired if read from a database)
    token = (await offlineAuthClient.refreshAccessToken()).token;
    //get the tweets with the refreshed token
    const tweets = await offlineClient.tweets.findTweetById("20");
    res.send(tweets);
  } catch (error) {
    console.log("tweets error", error);
  }
});

app.get("/revoke", async function (req, res) {
  try {
    const response = await authClient.revokeAccessToken();
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => {
  console.log(`Go here to login: http://127.0.0.1:3000/login`);
});
