const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Doctor = require("../models/doctor");

router.get("/user/:userId/profile", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId, { password: 0 });
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
});

router.get("/doctor/:doctorId/profile", async (req, res, next) => {
  try {
    const doctorId = req.params.doctorId;
    const doctor = await Doctor.findById(doctorId, { password: 0 });
    if (!doctor) {
      const error = new Error("A user with this id could not be found.");
      error.statusCode = 401;
      throw error;
    }
    return res.status(200).json({ doctor });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
