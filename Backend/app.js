/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const db = require("./db/db");
const header_middleware = require("./middlewares/header");

const postRouter = require("./Routes/post");
const userRoutes = require("./Routes/user");
const profileRoutes = require("./Routes/profile");
const localtunnel = require("localtunnel");

const app = express();

const PORT = process.env.PORT || 3001;

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
  tunnel.url;
  console.log(tunnel.url);
  tunnel.on("close", () => {
    // tunnels are closed
  });
  app.get("/", (req, res) => {
    res.send(tunnel.url);
  });
});
