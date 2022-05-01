const User = require('../models/user')
const appointment = require('../models/appointment')
const sendsms = require('../middleware/twilioSms')
const moment = require('moment');
exports.create = async(req,res,next)=>
{
    const {patient, doctor, name, phone, start, time} = req.body
    const foundAppointment = await appointment.findOne({start:start, time:moment(time).format("MMM Do YY")})
    const createAppointment = new appointment({
        patient:patient,
        doctor:doctor,
        name:name,
        phone:phone,
        start:start,
        time:moment(time).format("MMM Do YY")
    })
    try{
        if(foundAppointment)
        {
            return res.status(401).json({message:'This Appointment is not available'})
        }
        else
        {
            await createAppointment.save()
            const appointmentId = await appointment.findById(createAppointment._id)
            sendsms.sendmessage(appointmentId)
            return res.status(201).json({message:'Your appointment has been booked successfully'})
        }
    }
    catch(err){
        if(!err.statuscode)
        {
            err.statuscode = 500
        }
        next(err)
    }
}
exports.getAllReservation = async(req,res,next)=>
{
    const appointments = await appointment
    .find({patient:req.userId})
    try{
        return res.status(201).json(appointments)
    }
    catch(err){
        if(!err.statuscode)
        {
            err.statuscode = 500
        }
        next(err)
    }
}
exports.updateReservation = async(req,res,next)=>
{
    const id = req.params.id
    const {doctor, name, phone, start, time} = req.body
    const appointmentId = await appointment.findById({_id:id})
    const checktime = await appointment.findOne({start:start, time:moment(time).format("MMM Do YY")})
    if(!appointmentId)
    {
        return res.staus(400).json({message:'Not Found'})
    }
    try{
        appointmentId.doctor = doctor
        appointmentId.name = name
        appointmentId.phone = phone
        appointmentId.start = start
        appointmentId.time = moment(time).format("MMM Do YY")
        if(checktime)
        {
            return res.status(401).json({message:'This appointment is not available'})
        }
        await appointmentId.save()
        sendsms.sendUpdateMessage(appointmentId)
        return res.status(201).json(appointmentId)
    }
    catch(err){
        if(!err.statuscode)
        {
            err.statuscode = 500
        }
        next(err)
    }
}
exports.cancel = async(req,res,next)=>
{
    const id = req.params.id
    const findId = await appointment.findById(id)
    try
    {
        sendsms.cancelMessage(findId)
        const appointmentId = await appointment.findByIdAndRemove(id)
        return res.status(200).json({message:'Appointment has been deleted'})
    }
    catch(error)
    {
        if(!error.statuscode)
        {
            error.statuscode = 500
        }
        next(error)
    }
}