const mongoose = require('mongoose')
const imageUpload = mongoose.Schema({
    imageName: {type:String, required:true},
    url: {type:String, required:true}
})
module.exports = mongoose.model('imageUpload', imageUpload)