const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  bugs: {
    type: Array,
    default: [],
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender:{
    type: String,
    default:"nc",
  }
});

module.exports = User;
