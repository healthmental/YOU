/*
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const baseOptions = {
  collection: "reservations", // the name of our collection
};
const reservations = new Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
    doctor: { type: mongoose.Schema.Mixed },
    startDate: { type: Date },
    endDate: { type: Date },
    roomName: { type: String },
  },
  baseOptions
);

module.exports = mongoose.model("Reservation", reservations);
*/
