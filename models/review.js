const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema(
    {
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    comment:{
        type: String
    },
    doctor: {
        type: mongoose.Schema.ObjectId,
        ref: 'Doctor'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
}
);
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
