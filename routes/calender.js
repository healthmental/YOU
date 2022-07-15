const express = require("express");
const router = express.Router();
const calender = require("../controllers/calender");
const isAuth = require("../middleware/is-auth");

router.post("/calender", isAuth, calender.create);
// router.get("/workingHours", isAuth, calender.getWorkingHours);
// router.get("/spesficDay", isAuth, calender.getSpesficDay);
// router.post("/updateCalender", isAuth, calender.update);
// router.get("/reservationday", isAuth, calender.getReservationDay);
router.get("/getallreservations", isAuth, calender.getAllReservations);

module.exports = router;
