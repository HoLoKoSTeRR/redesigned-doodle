const User = require("../../models/user");

module.exports = async (req, res, done) => {
  console.log("req.query.range", req?.query?.range);
  if (req?.query?.range == undefined) {
    User.countDocuments({}, (err, count) => {
      if (err) {
        console.error(err);
        res.status(500).send("Erroreeeeeeeeee!");
      }
      res.header("Content-Range", `users 0-${count}/${count}`);

      done();
    });
  }
  let range = JSON.parse(req?.query?.range);
  User.countDocuments({}, (err, count) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erroreeeeeeeeee!");
    }
    res.header("Content-Range", `users ${range[0]}-${range[1]}/${count}`);
    done();
  });
};
