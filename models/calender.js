const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const baseOptions = {
  collection: "calender", // the name of our collection
};
const Calender = new Schema(
  {
    weekday: {
      type: String,
      enum: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      required: true,
    },
    date: { type: String },
    startAt: { type: String, required: true },
    endAt: { type: String, required: true },
    doctor: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  baseOptions
);
module.exports = mongoose.model("Calender", Calender);
