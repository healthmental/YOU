const express = require('express')
const isauth = require('../middleware/is-auth')
const usersControllers = require('../controllers/userReservation')
const router = express.Router()

router.post('/reservation', isauth, usersControllers.create)
router.get('/reservation', isauth, usersControllers.getAllReservation)
router.put('/reservation', isauth, usersControllers.updateReservation)
router.delete('/reservation', isauth, usersControllers.cancel)

module.exports = router