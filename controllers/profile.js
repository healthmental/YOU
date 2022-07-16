const User = require("../models/user");

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
      .populate("calender", "weekday startAt endAt duration date");
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

/*
exports.updateProfile = async (req, res, next) => {
    const userId = req.userId
    const { name, email , Mobilephone } = req.body
  
    try {
      const user = { name, email, Mobilephone }
      await User.update(userId, user)
      logger.info(`User ${userId} updated successfully`)
  
      return res.status(200).json({ message: "User updated successfully" })
    } catch (error) {
      next(error)
    }
  }
  */
