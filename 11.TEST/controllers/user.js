const User = require("../models/user");

exports.addFollowings = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: req.user.id });
    if (user) {
      await user.addFollowings([parseInt(req.params.id, 10)]); //removeFollowings, get, set
      res.send("success");
    } else {
      res.status(404).send("no user");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
