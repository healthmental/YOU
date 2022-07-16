const express = require("express");
const router = express.Router();
const { getProfile } = require("../controllers/profile");
const Doctor = require("../controllers/profile");

router.get("/profile/:id", getProfile);
router.get("/doctor/:id", Doctor.spesficDoc);

module.exports = router;
