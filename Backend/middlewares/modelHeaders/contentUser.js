const User = require("../../models/user");

module.exports = (request, reply, done) => {
    User.countDocuments({}, (err, count) => {
    if (err) {
      console.error(err);
      reply.status(500).send("Erroreeeeeeeeee!");
    }
    reply.header("Content-Range", `users 0-${count}/${count}`);
    reply.header("x-total-count", `users 0-${count}/${count}`);
    done();
  });
};
