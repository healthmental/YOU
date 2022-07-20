const express = require("express");
const router = express.Router();
const calender = require("../controllers/calender");
const isAuth = require("../middleware/is-auth");

router.post("/calender", isAuth, calender.create);
router.get("/getallreservations", isAuth, calender.getAllReservations);
router.get("/getall", isAuth, calender.getAllReservationsByDoctors);

module.exports = router;
