const express = require("express");
const report = require("../controllers/report");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/reports/:userId", isAuth, report.create);
router.get("/reports/:userId", report.getReport);

module.exports = router;
