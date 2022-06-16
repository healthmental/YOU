const User = require("../../models/user");

exports.listDoctors = async (req, res, next) => {
  try {
    const doctors = await User.find({ role: "doctor" }, { password: 0 });
    return res.status(200).json({ doctors });
  } catch (err) {
    next(err);
  }
};
