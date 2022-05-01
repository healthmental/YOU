const express = require('express')
const routes = express.Router()
const controller = require('../controllers/doctorReservation')
const auth = require('../middleware/is-auth')

routes.post('/create', auth, controller.create)
routes.get('/workingHours', auth, controller.getWorkingHours)
routes.get('/spesficDay/:id', auth, controller.getSpesficDay)
routes.put('/spesficDay/:id', auth, controller.update)
routes.delete('/spesficDay/:id', auth, controller.cancel)
routes.get('/getAllReservationDay', auth, controller.getAllReservationDay)
routes.get('/getReservationDay', auth, controller.getReservationDay)
routes.get('/getReservationDay/:id', auth, controller.getReservationDayById)
routes.delete('/getReservationDay/:id', auth, controller.deleteReservation)

module.exports = routes