const Reviews = require("../models/review");
const User = require("../models/user");

exports.addReview = async (req, res, next) => {
  try {
    const doctorId = req.params.doctorId;
    const userId = req.userId;

    // Don't allow the doctor to post a review on himself.
    if (userId === doctorId) throw new CustomError(400, "You cannot review yourself :D");

    const user = await User.findById(userId, { name: 1, image: 1 });
    const review = new Reviews({
      rating: req.body.rating,
      comment: req.body.comment,
      doctorId,
      user,
      createdAt: new Date().toISOString(), // 2020-01-01T00:00:00Z
    });
    const result = await review.save();
    return res.status(201).json({ message: "Review added successfully!" });
  } catch (err) {
    next(err);
  }
};

exports.getReviews = async (req, res, next) => {
  try {
    const doctorId = req.params.doctorId;
    const reviews = await Reviews.find({ doctorId });

    res.status(200).json({ reviews });
  } catch (err) {
    next(err);
  }
};
