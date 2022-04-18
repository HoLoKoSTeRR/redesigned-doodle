import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "jquery/dist/jquery.js";

setInterval(async () => {
  axios
    // .get("https://zany-periodic-fisherman.glitch.me/test")
    //.get("http://localhost:3001/test")
    .get("https://arcane-anchorage-00164.herokuapp.com/test")
    .then((data) => {
      console.log(`${data.status} ${data.statusText}`);
    })
    .catch((e) => {
      console.log(e.response);
    });
}, 60e3);
// axios.defaults.baseURL = "https://zany-periodic-fisherman.glitch.me/api";
axios.defaults.baseURL = "http://localhost:3001/api";
// axios.defaults.baseURL = "https://arcane-anchorage-00164.herokuapp.com/api";
let userData = JSON.parse(localStorage.getItem("userData"));
let token;
if (userData) {
  token = userData.token;
}
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    // Edit response config
    //console.log(response);
    return response;
  },
  (error) => {
    console.log(error.response);
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,

  document.getElementById("root")
);
