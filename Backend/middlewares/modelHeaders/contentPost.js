const Post = require("../../models/post");

module.exports = async (req, res, done) => {
  let range = await JSON.parse(req.query.range);
  Post.countDocuments({}, (err, count) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erroreeeeeeeeee!");
    }
    if (range) {
      res.header("Content-Range", `posts ${range[0]}-${range[1]}/${count}`);
    } else {
      res.header("Content-Range", `posts 0-${count}/${count}`);
    }
    done();
  });
};
