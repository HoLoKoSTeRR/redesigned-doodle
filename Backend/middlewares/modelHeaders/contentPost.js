const Post = require("../../models/post");

module.exports = async (req, res, done) => {
  if (typeof req.query?.range === typeof undefined) {
    Post.countDocuments({}, (err, count) => {
      if (err) {
        console.error(err);
        res.status(500).send("Erroreeeeeeeeee!");
      }
      res.header("Content-Range", `posts 0-${count}/${count}`);

      done();
    });
  } else {
    let range = JSON.parse(req.query.range);
    Post.countDocuments({}, (err, count) => {
      if (err) {
        console.error(err);
        res.status(500).send("Erroreeeeeeeeee!");
      }
      res.header("Content-Range", `posts ${range[0]}-${range[1]}/${count}`);
      done();
    });
  }
};
