const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
  },
  doctorId: {
    type: mongoose.Schema.ObjectId,
    ref: "Doctor",
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
