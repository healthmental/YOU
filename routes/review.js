const express = require("express");
const review = require("../controllers/review");
const isauth = require("../middleware/is-auth");

const router = express.Router();

router.post("/doctors/:doctorId/reviews", isauth, review.addReview);

router.get("/doctors/:doctorId/reviews", review.getReviews);

module.exports = router;
