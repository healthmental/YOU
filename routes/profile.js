const express = require("express");
const router = express.Router();
const { getProfile } = require("../controllers/profile");
//const { addReservation } = require("../controllers/reservation.js");

router.get("/profile/:id", getProfile);

/*router.post("/reservations", addReservation);*/

module.exports = router;
