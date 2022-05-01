const express = require('express');

const {
    getReview,
    getReviews,
    createReview,
    updateReview,
    deleteReview,
} = require('../controllers/userReview');

const authRouter = require('../middleware/is-auth');

const  router = express.Router();

router
.route('/')
.get(getReviews).post(authRouter.protect, authRouter.allowed('user'), createReview);
router
.route('/:id')
.get(getReview)
.put(authRouter.protect, authRouter.allowed('user'), updateReview)
.delete(authRouter.protect, authRouter.allowed('user','doctor'), deleteReview);

module.exports = router;