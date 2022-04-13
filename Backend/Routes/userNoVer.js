const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const mongoose = require("mongoose");
router.post("", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
      bugs: req.body.bugs,
      full_name: req.body.full_name,
      gender: req.body.genger,
      age: req.body.age,
    });

    User.findOne({ email: { $eq: req.body.email } })
      .then((user1) => {
        if (user1) {
          return res.status(401).json({
            message: "User Already Exist",
          });
        }

        user.save().then((result) => {
          if (!result) {
            return res.status(500).json({
              message: "Error Creating USer",
            });
          }
          res.status(201).json({
            message: "User created!",
            result: result,
          });
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
});

router.put("/:id", (req, res, next) => {
  if (req.body.password) {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      const user = {
        email: req.body.email,
        password: hash,
        bugs: req.body.bugs,
        full_name: req.body.full_name,
        gender: req.body?.genger,
        age: req.body.age,
      };
      User.findOne({ email: { $eq: req.body.email } }).then((user1) => {
        if (user1) {
          return res.status(401).json({
            message: "Email Already Exists!1!!!",
          });
        }
      });
      User.updateOne(
        { _id: mongoose.Types.ObjectId(req.body.id) },
        { $set: { ...user } }
      )
        .then((user1) => {
          return res.status.send(user1);
        })
        .catch((err) => {
          res.status(500).json({
            egor: err,
          });
        });
    });
  } else {
    const user = {
      email: req.body.email,
      bugs: req.body.bugs,
      full_name: req.body.full_name,
      gender: req.body?.genger,
      age: req.body.age,
    };
    User.updateOne(
      { _id: mongoose.Types.ObjectId(req.body.id) },
      { $set: { ...user } }
    )
      .then((user1) => {
        return res.status.send(user1);
      })
      .catch((err) => {
        res.status(500).json({
          error: { ...err },
        });
      });
  }
});

router.get("", (req, res, next) => {
  let range = JSON.parse(req.query?.range);
  let sort = JSON.parse(req.query.sort);
  console.log("USER GEt", "range", range, "sort", sort);
  User.find()
    .skip(range[0])
    .limit(range[1] - range[0] + 1)
    .then((prof) => {
      if (prof) {
        res.status(200).json(prof);
      } else {
        res.status(404).json({ message: "Profiles not found!" });
      }
    })
    .catch((e) => {
      console.error(e);
    });
});

router.get("/:id", (req, res, next) => {
  User.findById(req.params.id).then((user) => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  });
});

//delete many users by query params
router.delete("", (req, res, next) => {
  let filter = JSON.parse(req.query?.filter);
  let query = { _id: { $in: filter.id } };
  console.log("USER DELETE", "filter", filter, query);
  //res.status(200).json({ _id: { $in: filter.id } });
  User.deleteMany(query)
    .then((prof) => {
      if (prof) {
        res.status(200).json(filter.id);
      } else {
        res.status(404).json({ message: "Profiles not found!" });
      }
    })
    .catch((e) => {
      console.error(e);
    });
});

module.exports = router;
