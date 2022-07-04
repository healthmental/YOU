/*const Reservation = require("../models/reservation");

exports.addReservation = async (req, res, next) => {
  const { doctorId, startDate, endDate, roomName } = req.body;
  try {
    // const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    // const d = new Date(date);
    // const dayName = days[d.getDay()];
    // const workingDays = await User.findById(doctorId, { workingDays: 1 }); // ["saturday"]

    const reservation = new Reservation({ doctorId, startDate, endDate, roomName });
    const result = await reservation.save();
    console.log(result);

    return res.status(200).json({ message: "Success" });
  } catch (err) {
    next(err);
  }
};
*/
