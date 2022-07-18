const express = require("express");
const router = express.Router();
const { getProfile } = require("../controllers/profile");
const Doctor = require("../controllers/profile");
const isAuth = require("../middleware/is-auth");
const { updateProfile } = require("../controllers/profile");

router.get("/profile/:id", getProfile);
router.get("/doctor/:id", Doctor.spesficDoc);
router.post("/profile/:id", isAuth, updateProfile);

module.exports = router;
