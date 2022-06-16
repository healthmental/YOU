const express = require("express");
const router = express.Router();
const { getProfile } = require("../controllers/profile");

router.get("/profile/:id", getProfile);

module.exports = router;
