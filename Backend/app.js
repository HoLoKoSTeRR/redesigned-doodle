/* eslint-disable no-unused-vars */
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
//const localtunnel = require("localtunnel");

const db = require("./db/db");
const header_middleware = require("./middlewares/header");
const postRouter = require("./Routes/post");
const userRoutes = require("./Routes/user");
const profileRoutes = require("./Routes/profile");
const adminRoutes = require("./Routes/admin");
const { contentPost, contentProfiles,contentUser } = require("./middlewares/modelHeaders");

const app = express();

const PORT = process.env.PORT || 3001;

// set up rate limiter: maximum of five requests per minute
var RateLimit = require("express-rate-limit");
var limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5,
});

// apply rate limiter to all requests
//app.use(limiter);

app.use(express.json());
app.use(header_middleware);
app.use("/api/posts",contentPost);
app.use("/api/profile", contentProfiles);
app.use("/api/user", contentUser);
const directory = path.join(__dirname, "./images");
app.use("/images", express.static(directory));

app.use("/api/posts", postRouter);
app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/admin", adminRoutes);

app.get("/test", (req, res) => {
  res.send("Hello World!");
});

app.get("/", (req, res) => {
  res.send(
    "<pre>Hey buddy, I think you've got the wrong Route, the end user's club's two links down.\n<br><b>Fuck♂You♂</b>\nOh, Fuck♂You end user. Maybe you and I should settle it right here on the ring if you think your so tough.\nOh yea? I'll kick your ass!\nHa! Yeah right man. Let's go! Why don't you get out of that user stuff? I'll strip down out of this and we'll settle it right here in the ring. What do you say?\nYeah, no problem buddy!\nYou got it. Get out of that uh, webmaster.\nYeah, smart ass.\nI'll show you who's the boss of this host.</pre>"
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
