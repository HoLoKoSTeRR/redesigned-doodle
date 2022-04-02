/* eslint-disable no-unused-vars */
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const localtunnel = require("localtunnel");

const db = require("./db/db");
const header_middleware = require("./middlewares/header");
const postRouter = require("./Routes/post");
const userRoutes = require("./Routes/user");
const profileRoutes = require("./Routes/profile");

const app = express();

const PORT = process.env.PORT || 3001;

// set up rate limiter: maximum of five requests per minute
var RateLimit = require('express-rate-limit');
var limiter =  RateLimit({
  windowMs: 1*60*1000, // 1 minute
  max: 5
});

// apply rate limiter to all requests
app.use(limiter);

app.use(express.json());
app.use(header_middleware);
const directory = path.join(__dirname, "./images");
app.use("/images", express.static(directory));

app.use("/api/posts", postRouter);
app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoutes);

app.get("/test", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, async (req, res) => {
  const tunnel = await localtunnel({ port: PORT });
  console.log(tunnel.url);
  app.get("/", (req, res) => {
    res.send(tunnel.url);
  });
});
