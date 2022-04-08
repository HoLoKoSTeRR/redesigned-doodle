const Post = require("../../models/post");

module.exports = async (req, res, done) => {
  let { range } = req.query;
  Post.countDocuments({}, (err, count) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erroreeeeeeeeee!");
    }
    range == undefined ? (range = [0, 0]) : (range = JSON.parse(range));
    //res.header("Content-Range", `post ${range[0]}-${range[1]}/${count}`);

    res.header("Content-Range", `post 0-${count}/${count}`);
    done();
  });
};
