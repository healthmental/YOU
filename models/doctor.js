const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user"); // we have to make sure our doctor schema is aware of the user schema
const Doctor = User.discriminator('Doctor',
  mongoose.Schema({
    profession: {type: String, required: true }, 
    languages: {type: [String], required: true}, 
    licIssuedDate: {type: String, required: true}, 
    licExpiryDate: {type: String, required: true},
    reviews:[
      {
        type:mongoose.Schema.ObjectId,
        ref: 'Review'
      }
    ]
  },)
);
module.exports = mongoose.model("Doctor"); 