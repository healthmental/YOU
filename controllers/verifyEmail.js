const User = require("../models/user");
const { CustomError } = require("../utils/error");

exports.verifyEmail = async (req, res, next) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ email });
    console.log(user);
    if (!user) throw new CustomError(404, "User not found");
    if (user.code !== code) throw new CustomError(400, "Invalid code");

    await verifyEmail(email);

    console.log("Email verified successfully!");
    return res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    next(err);
  }
};

const verifyEmail = async (email) => {
  await User.findOneAndUpdate({ email }, { emailVerified: true });
};
