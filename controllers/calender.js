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
    const allReservations = await reservation
      .find({ doctor: req.doctor })
      .populate({
        path: "doctor",
        select: "name",
      })
      .populate({
        path: "userId",
        select: "name",
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
/*
exports.getWorkingHours = async (req, res, next) => {
  var id = req.params.id;
  const workingHours = await calender.findById(id);
  try {
    if (!workingHours) {
      return res.status(404).json({ message: "Your working hours not found" });
    }
    return res.status(200).json(workingHours);
  } catch (error) {
    if (!error.statuscode) {
      error.statuscode = 500;
    }
    next(error);
  }
};
exports.getSpesficDay = async (req, res, next) => {
  var id = req.params.id;
  const spesficDay = await calender.findById(id);
  try {
    if (!spesficDay) {
      return res.status(404).json({ message: "No such slot" });
    }
    return res.status(200).json(spesficDay);
  } catch (error) {
    if (!error.statuscode) {
      error.statuscode = 500;
    }
    next(error);
  }
};
exports.update = async (req, res, next) => {
  var id = req.params.id;
  const spesficDay = await calender.findById(id);
  if (!spesficDay) {
    return res.status(404).json({ message: "No appointments" });
  }
  try {
    const updated = await calender.findOneAndUpdate({ _id: spesficDay }, { $set: req.body });
    return res.status(200).json(updated);
  } catch (error) {
    if (!error.statuscode) {
      error.statuscode = 500;
    }
    next(error);
  }
};
exports.cancel = async (req, res, next) => {
  var id = req.params.id;
  const spesficDay = await calender.findById(id);
  if (!spesficDay) {
    return res.status(404).json({ message: "No appointments" });
  }
  try {
    const deleted = await calender.findOneAndDelete(spesficDay);
    return res.status(200).json("Appointment has been deleted");
  } catch (error) {
    if (!error.statuscode) {
      error.statuscode = 500;
    }
    next(error);
  }
};
exports.getReservationDay = async (req, res, next) => {
  const time = req.body.time;
  const doctor = req.userId;
  const reservation = await appointments
    .find({ doctor: doctor, time: moment(time).format("MMM Do YY") })
    .populate("patient", "userName gender birthDate");
  if (!time) {
    return res.status(401).json({ message: "Please send the exact date" });
  }
  try {
    return res.status(200).json(reservation);
  } catch (error) {
    if (!error.statuscode) {
      error.statuscode = 500;
    }
    next(error);
  }
};

exports.getReservationDayById = async (req, res, next) => {
  const status = req.body.status;
  const id = req.params.id;
  const getReservationDayById = await appointments
    .findById(id)
    .populate("patient", "userName gender birthDate")
    .populate("doctor", "userName");
  if (!getReservationDayById) {
    return res.status(401).json({ message: "Not Found" });
  }
  try {
    return res.status(200).json(getReservationDayById);
  } catch (error) {
    if (!error.statuscode) {
      error.statuscode = 500;
    }
    next(error);
  }
};
exports.deleteReservation = async (req, res, next) => {
  const id = req.params.id;
  try {
    const deleteReservation = await appointments.findByIdAndRemove(id);
    return res.status(200).json({ message: "Appointment deleted" });
  } catch (error) {
    if (!error.statuscode) {
      error.statuscode = 500;
    }
    next(error);
  }
};
*/
