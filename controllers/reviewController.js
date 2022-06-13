const Reviews = require("../models/review");
const Doctor = require("../models/doctor");

exports.addReview = async (req, res, next) => {
  try {
    const doctorId = req.params.doctorId;
    const userId = req.userId;
    console.log(userId);
    // Don't allow the doctor to post a review on himself.
    if (userId === doctorId) {
      const error = new Error("You can't review yourself :D");
      error.statusCode = 400;
      throw error;
    }

    const review = new Reviews({
      rating: req.body.rating,
      comment: req.body.comment,
      userId,
      doctorId,
      time: new Date().toISOString(), // 2020-01-01T00:00:00Z
    });
    const result = await review.save();
    console.log(result);
    return res.status(201).json({ message: "Review added successfully!" });
  } catch (err) {
    next(err);
  }
};

exports.getReviews = async (req, res, next) => {
  try {
    const doctorId = req.params.doctorId;

    const reviews = await Reviews.aggregate([
      {
        $match: {
          $and: [{ doctorId }],
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
    ]);
    // const reviews = await Reviews.find({ doctorId });

    res.status(200).json({ reviews });
  } catch (err) {
    next(err);
  }
};
