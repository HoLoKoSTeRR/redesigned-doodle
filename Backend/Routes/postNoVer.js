const express = require("express");
const Post = require("../models/post");
const router = new express.Router();
const multer = require("multer");
const { json } = require("body-parser");
const mongoose = require("mongoose");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/gif": "gif",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];

    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");

    console.log(name);
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, "post-" + Date.now() + "." + ext);
  },
});

router.post(
  "",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath;
    const url = req.protocol + "://" + req.get("host");
    if (req.file?.filename) {
      imagePath = url + "/images/" + req.file.filename;
    } else {
      imagePath = url + "/images/background.jpg";
    }

    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath,
      creator: "622759cd99a7c1db81f5cfa3",
      postDate: Date().toString(),
    });
    post
      .save()
      .then((post) => {
        if (post) {
          res.status(201).json({
            data: { id: post._id, ...post },
          });
        }

        if (!post) {
          res.status(404).json({ data: { message: "Error Adding Post" } });
        }
      })
      .catch((e) => {
        console.log(e);
        res.status(501).json({ data: { message: "Error Adding Post" + e } });
      });
  }
);

router.put(
  "/:id",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    var query = req.query;
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath,
      creator: req.body.creator,
    });
    Post.updateOne(
      { _id: req.params.id, creator: req.body.creator },
      post
    ).then((result) => {
      if (result) {
        res.status(200).json({ data: { id: req.params.id, result } });
      } else {
        res.status(500).json({ data: { message: "Error Upating Post" } });
      }
    });
  }
);

router.get("", (req, res, next) => {
  let { range, sort, filter } = req.query;
  sort = sort ? JSON.parse(sort) : {};
  // console.log(sort[0], sort[1]);
  range == undefined ? (range = [0, 0]) : JSON.parse(range);
  filter = JSON.parse(filter);
  Post.find(filter)
    .sort({ postDate: sort[1] })
    .skip(parseInt(range[0]))
    .limit(parseInt(range[1]) - parseInt(range[0]) + 1)
    .then((documents) => {
      if (documents) {
        res.status(200).json(documents);
      } else {
        res.status(404).json({ data: { message: "Post not found!" } });
      }
    });
});
router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ data: { message: "Post not found!" } });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  filtr = JSON.parse(req.query.filter);
  let id = filtr.id[0];

  Post.deleteOne({ _id: id }).then((result) => {
    if (result.n > 0) {
      res.status(200).json({ data: { message: "Deletion successful!" } });
    } else {
      return res.status(401).json({ data: { message: "errR!" } });
    }
  });
});
router.delete("", (req, res, next) => {
  filtr = JSON.parse(req.query.filter);
  let id = filtr.id;

  Post.deleteMany({ _id: { $in: id } }).then((result) => {
    if (result.n > 0) {
      res.status(200).send({ data: [id] });
    } else {
      return res.status(500).json({ data: { message: "ERROR" } });
    }
  });
});

module.exports = router;
