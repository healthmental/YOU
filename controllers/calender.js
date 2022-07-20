const calender = require("../models/calender");
const reservation = require("../models/reservation");
const User = require("../models/user.js");
const moment = require("moment");

exports.create = async (req, res, next) => {
  try {
    const hoursworking = new calender({
      weekday: req.body.weekday,
      startAt: moment(req.body.startAt, "h:mm a").format("h:mm a"),
      endAt: moment(req.body.endAt, "h:mm a").format("h:mm a"),
      doctor: req.userId,
      date: moment(req.body.date).format("YYYY-MM-DD"),
    });
    await hoursworking.save();
    const doctor = await User.findByIdAndUpdate({ _id: req.userId }, { $push: { calender: hoursworking } });
    return res.status(201).json(hoursworking);
  } catch (error) {
    if (!error.statuscode) {
      error.statuscode = 500;
    }
    next(error);
  }
};

exports.getAllReservations = async (req, res, next) => {
  try {
    const allReservations = await calender.find({}).populate({
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

exports.getAllReservationsByDoctors = async (req, res, next) => {
  try {
    const allReservations = await reservation
      .find({ doctor: req.userId })
      .select("startDate date roomName ")
      .populate({ path: "doctor", select: "name image mobilePhone profession email" })
      .populate({ path: "calender", select: "weekday" })
      .populate({ path: "userId", select: "name image gender email" });
    console.log(req.userId);

    if (allReservations.length == 0) {
      return res.json({ message: "No appointments" });
    }
    return res.json({
      totalReservations: allReservations.length,
      totalbooking: allReservations,
    });
  } catch (error) {
    if (!error.statuscode) {
      error.statuscode = 500;
    }
    next(error);
  }
};
