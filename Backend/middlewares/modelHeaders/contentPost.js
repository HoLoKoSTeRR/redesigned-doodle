const Post = require("../../models/post");

module.exports = (request, reply, done) => {
    Post.countDocuments({}, (err, count) => {
    if (err) {
      console.error(err);
      reply.status(500).send("Erroreeeeeeeeee!");
    }
    reply.header("Content-Range", `profiles 0-${count}/${count}`);
    reply.header("x-total-count", count);
    done();
  });
};
