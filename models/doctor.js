const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const baseOptions = {
  discriminatorKey: "usertype", // our discriminator key, could be anything
  collection: "doctors", // the name of our collection
};
const doctorSchema = new Schema(
  {
    image: { type: String },
    name: { type: String, required: true },
    mobilePhone: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    birthDate: { type: String, required: true },
    contactRelation: { type: String },
    languages: { type: [String], required: true },
    licIssuedDate: { type: String, required: true },
    licExpiryDate: { type: String, required: true },
    profession: { type: String, required: true },
  },
  baseOptions
);

module.exports = mongoose.model("Doctor", doctorSchema);
