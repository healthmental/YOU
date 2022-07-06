const User = require("../models/user");
//const Reservation = require("../models/reservation");

exports.getProfile = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id, { password: 0 });
    const date = new Date().toISOString();
    /*if (user.role === "doctor") {
      const reservations = await Reservation.find({ doctorId: id });
      reservationFound = reservatios.find((reservation) => reservation.startDate);
    } */

    console.log(user);
    if (!user) {
      const error = new Error("A user with this id could not be found.");
      error.statusCode = 401;
      throw error;
    }
    return res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};
