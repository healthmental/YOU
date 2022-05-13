const express = require('express');
const reviewController = require('../controllers/reviewController');
const isauth = require('../middleware/is-auth');

const router = express.Router();

router.post('/review/:doctorId',isauth, reviewController.addReview)

module.exports = router;
