/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;

const url = process.env.MONGODB_URI;
if (!url) {
  process.exitCode = 1;
  throw new Error("MONGODB_URI is not defined, please define it in . env file");
}
// console.log(url);
let mong = mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);
