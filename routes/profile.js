const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Doctor = require("../models/doctor");
const profile = require("../controllers/profile");

router.get("/user/:userId/profile", profile.getProfileUser);

router.get("/doctor/:doctorId/profile", profile.getProfileDoctor);

module.exports = router;
