const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
    titel:{
        type: String,
    },
    ratings: {
        type: Number,
        min: [1, 'Min ratings value is 1.0'],
        max: [5, 'Max ratings value is 5.0'],
        required: [true, 'review ratings required'],
    },
    user: {
        type: mongoose.Schema.objectId,
        ref: 'User',
        required: [true, 'Review must belong to user'],
    },
    doctor: {
        type: mongoose.Schema.objectId,
        ref: 'Doctor',
        required: [true, 'Review must belong to doctor'],
    },
    }, 
{timestamps: true}
);

module.exports = mongoose.model('Review', reviewSchema);
