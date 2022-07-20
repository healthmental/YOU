const User = require("../models/user");
const moment = require("moment");

exports.getProfile = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id, { password: 0 });
    const date = new Date().toISOString();

    console.log(user);
    if (!user) {
      const error = new Error("A user with this id could not be found.");
      error.statusCode = 401;
      throw error;
    }
    return res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

exports.spesficDoc = async (req, res, next) => {
  try {
    const spesficDoc = await User.findById(req.params.id)
      .select("image name calender")
      .populate("calender", "weekday startAt endAt duration date")
      .select(moment().format("startAt endAt"));
    if (!spesficDoc) {
      return res.status(404).json({
        message: "This doctor does not exist",
      });
    }
    return res.status(200).json(spesficDoc);
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  const userId = req.userId;

  try {
    const update = await User.findByIdAndUpdate(userId, { ...req.body });
    //update.email = req.body.email;
    //update.name = req.body.name;
    //update.save();
    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    next(error);
  }
};
