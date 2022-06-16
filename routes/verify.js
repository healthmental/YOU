const express = require("express");
const router = express.Router();
const { verifyEmail } = require("../controllers/verifyEmail");

router.post("/verify/email", verifyEmail);

module.exports = router;
