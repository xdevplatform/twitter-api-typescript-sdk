// Copyright 2021 Twitter, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Client, auth } from "twitter-api-sdk";
import express from "express";
import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(session({
  secret: "secret-key",
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false,
    httpOnly: true
  }
}));

const authClient = new auth.OAuth2User({
  client_id: process.env.CLIENT_ID as string,
  client_secret: process.env.CLIENT_SECRET as string,
  callback: "http://127.0.0.1:3000/callback",
  scopes: ["tweet.read", "users.read", "offline.access"],
});

const client = new Client(authClient);

const STATE = "my-state";

app.get("/callback", async function (req, res) {
  try {
    const { code, state } = req.query;
    if (state !== req.session.state) {
      return res.status(400).send("Invalid state parameter");
    }
  
    await authClient.requestAccessToken(code as string);
    req.session.oauthTokens = {
      access_token: authClient.credentials.access_token,
      refresh_token: authClient.credentials.refresh_token
    };
  
    res.redirect("/tweets");
  } catch (error) {
    console.error(error);
  }
});

app.get("/login", async function (req, res) {
  const authUrl = authClient.generateAuthURL({
    state: req.session.state,
    code_challenge_method: "s256",
  });
  res.redirect(authUrl);
});

app.get("/tweets", async function (req, res) {
  try {
    if (!req.session.oauthTokens) {
      return res.status(401).send("Not authenticated");
    }

    const userClient = new Client({
      bearer_token: req.session.oauthTokens.access_token
    })

    const tweets = await userClient.tweets.findTweetById("20");
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
