const express = require("express");
const Post = require("../models/post");
const router = new express.Router();
const multer = require("multer");
const checkAuth = require("../middlewares/check-auth");

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

    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null,"post-" + Date.now() + "." + ext);
  },
});

router.post(
  "",
  checkAuth,
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
      creator: req.userData.userId,
      postDate: req.body.postDate,
    });
    post
      .save()
      .then((post) => {
        if (post) {
          res.status(201).json({
            ...post,
            id: post._id,
          });
        }

        if (!post) {
          res.status(404).json({
            message: "Error Adding Post",
          });
        }
      })
      .catch((e) => {
        console.log(e);
        res.status(501).json({ message: "Error Adding Post" + e });
      });
  }
);

router.put(
  "/:id",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
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
      creator: req.userData.userId,
    });
    Post.updateOne(
      { _id: req.params.id, creator: req.userData.userId },
      post
    ).then((result) => {
      if (result) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(500).json({ message: "Error Upating Post" });
      }
    });
  }
);

router.get("/mypost", checkAuth, (req, res, next) => {
  Post.find({ creator: req.userData.userId })
    .then((post) => {
      if (post) {
        res.status(200).json({ posts: post });
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    })
    .catch((e) => {
      console.log(e);
    });
});

router.get("", (req, res, next) => {
  Post.find().then((documents) => {
    if (documents) {
      res.status(200).json({ posts: documents });
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});
router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(
    (result) => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        return res.status(401).json({ message: "Not authorized!!" });
      }
    }
  );
});

module.exports = router;
