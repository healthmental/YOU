const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, min: 1, max: 5 },
  comment: { type: String },
  doctorId: { type: mongoose.Schema.ObjectId, ref: "User" },
  user: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date },
});
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
