const mongoose = require('mongoose')
const schema = mongoose.Schema
const appointmentSchema = new schema ({
    user: {type:mongoose.Schema.Types.ObjectId, ref:"User",required:true,},
    doctor: {type:mongoose.Schema.Types.ObjectId, ref:"Doctor", required:true},
    start: {type:String, required:true},
    time: {type:String},
    phone: {type:String}
})
module.exports = mongoose.model('appointments', appointmentSchema)