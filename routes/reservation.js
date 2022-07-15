const express = require("express");
const reservation = require("../controllers/reservation");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/reservation", isAuth, reservation.addReservation);

router.get("/reservation", isAuth, reservation.getAllReservations);

module.exports = router;
