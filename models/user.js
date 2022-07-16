const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const baseOptions = {
  discriminatorKey: "usertype", // our discriminator key, could be anything
  collection: "users", // the name of our collection
};
const userSchema = new Schema(
  {
    image: { type: String },
    name: { type: String, required: true },
    mobilePhone: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    birthDate: { type: String, required: true },
    trustContact: { type: String },
    contactRelation: { type: String },
    medicalHistory: { type: String },
    sessions: { type: [String] },
    languages: { type: [String] },
    licIssuedDate: { type: String },
    licExpiryDate: { type: String },
    profession: { type: String },
    sessionPrice: { type: String, default: "400" },
    role: { type: String },
    code: { type: String },
    emailVerified: { type: Boolean, default: false },
    calender: [{ type: mongoose.Schema.ObjectId, ref: "Calender" }],
  },
  baseOptions
);

module.exports = mongoose.model("User", userSchema);
