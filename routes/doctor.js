const express = require("express");
const router = express.Router();
const { listDoctors } = require("../controllers/doctors/listDoctors");

router.get("/doctors", listDoctors);

module.exports = router;
