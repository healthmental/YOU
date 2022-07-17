const express = require("express");
const report = require("../controllers/report");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/reports", isAuth, report.create);

module.exports = router;
