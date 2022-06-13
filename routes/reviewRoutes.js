const express = require("express");
const reviewController = require("../controllers/reviewController");
const isauth = require("../middleware/is-auth");

const router = express.Router();

router.post("/doctors/:doctorId/reviews", isauth, reviewController.addReview);

router.get("/doctors/:doctorId/reviews", reviewController.getReviews);

module.exports = router;
