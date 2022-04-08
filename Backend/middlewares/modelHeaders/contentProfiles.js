const Profile = require("../../models/profile");

module.exports = (req, res, done) => {
  let { range } = req.query;
  try {
    range = JSON.parse(range);
  } catch {
    return undefined;
  }
  Profile.countDocuments({}, (err, count) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erroreeeeeeeeee!");
    }
    range == undefined
      ? (range = `post ${range[0]}-${range[1]}/${count}`)
      : (range = `post 0-${count}/${count}`);
    res.header("Content-Range", range);
    res.header("x-total-count", range);
    done();
  });
};
