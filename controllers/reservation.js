const Reservation = require("../models/reservation");
const User = require("../models/user");

exports.addReservation = async (req, res, next) => {
  try {
    const doctor = await User.findById(req.body.doctor);
    const createAppointment = new Reservation({
      doctor: req.body.doctor,
      startDate: req.body.startDate,
      userId: req.userId,
      date: req.body.date,
      roomName: req.body.roomName,
    });
    const foundApppoitment = await Reservation.findOne({
      doctor: req.body.doctor,
      startDate: req.body.startDate,
      date: req.body.date,
    });
    if (foundApppoitment) {
      return res.status(200).json({ message: "you cant reservation twice" });
    }

    await createAppointment.save();
    const userappointment = await User.findByIdAndUpdate(
      { _id: req.userId },
      { $push: { calender: createAppointment } }
    );
    return res.status(201).json({
      message: "Your Reservation succeeded",
      id: createAppointment._id,
    });
  } catch (err) {
    next(err);
  }
};
exports.getAllReservations = async (req, res, next) => {
  try {
    const allReservations = await Reservation.find({ userId: req.userId })
      .select("startDate date roomName")
      .populate({
        path: "doctor",
        select: [
          "name",
          "image",
          "email",
          "mobilePhone",
          "gender",
          "birthDate",
          "profession",
          "languages",
          "sessionPrice",
          "licIssuedDate",
          "licExpiryDate",
        ],
      })
      .populate({
        path: "userId",
        select: [
          "name",
          "image",
          "email",
          "mobilePhone",
          "gender",
          "birthDate",
          "trustContact",
          "contactRelation",
          "sessions",
        ],
      });
    if (allReservations.length == 0) {
      return res.json({ message: "No appointments" });
    }
    return res.json({ totalReservations: allReservations.length, allReservations });
  } catch (error) {
    if (!error.statuscode) {
      error.statuscode = 500;
    }
    next(error);
  }
};
