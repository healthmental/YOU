const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Calender = new Schema({
    weekday:{type:String, enum:["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], required:true},
    startAt:{type:String, required:true},
    endAt:{type:String, required:true},
    doctor:{type:Schema.Types.ObjectId, ref:"Doctor", required:true}
})
module.exports = mongoose.model('Calender', Calender)