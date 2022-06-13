//const crypto = require('crypto');
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Doctor = require("../models/doctor");
const cloud = require("../config/cloudinary");
const { token } = require("morgan");

exports.signupUser = async (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const name = firstName + " " + lastName;
  const mobilePhone = req.body.mobilePhone;
  const gender = req.body.gender;
  const email = req.body.email;
  const password = req.body.password;
  const birthDate = req.body.birthDate;
  const trustContact = req.body.trustContact;
  const contactRelation = req.body.contactRelation;
  const medicalHistory = req.body.medicalHistory;
  const sessions = req.body.sessions;
  try {
    let image = req.body.image;
    console.log(req.file.path, req.file);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const hashedPW = await bcrypt.hash(password, 12);
    const imageResult = await cloud.uploads(req.file.path);
    console.log(imageResult, image);
    image = imageResult.url;
    const user = new User({
      name: name,
      mobilePhone: mobilePhone,
      gender: gender,
      email: email,
      password: hashedPW,
      birthDate: birthDate,
      trustContact: trustContact,
      contactRelation: contactRelation,
      medicalHistory: medicalHistory,
      sessions: sessions,
      image: image,
    });
    const result = await user.save();
    res.status(201).json({ message: "User created!", userId: result._id, token: token });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.signupDoctor = async (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const name = firstName + " " + lastName;
  const mobilePhone = req.body.mobilePhone;
  const gender = req.body.gender;
  const email = req.body.email;
  const password = req.body.password;
  const profession = req.body.profession;
  const birthDate = req.body.birthDate;
  const languages = req.body.languages;
  const licIssuedDate = req.body.licIssuedDate;
  const licExpiryDate = req.body.licExpiryDate;
  try {
    let image = req.file.path;
    console.log(req.file.path, req.file);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const hashedPW = await bcrypt.hash(password, 12);
    const doctor = new Doctor({
      name: name,
      mobilePhone: mobilePhone,
      gender: gender,
      email: email,
      password: hashedPW,
      birthDate: birthDate,
      profession: profession,
      languages: languages,
      licIssuedDate: licIssuedDate,
      licExpiryDate: licExpiryDate,
      image: image,
    });
    const result = await doctor.save();
    return res.status(201).json({ message: "Doctor created!", doctorId: result._id });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("A user with this email could not be found.");
      error.statusCode = 401;
      throw error;
    }
    // if (user.permission !== permission ){
    //     return res.json({ message: "You are not alowed to this gate" });
    // }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("incorrect password!");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      "mysupersecret",
      { expiresIn: "1d" }
    );
    res.status(200).header("token", token).json({
      message: "login successful",
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

/*
exports.forgetPassword = async (req ,res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if(!user) {
        return next(
            new ApiError(`There is no user with that email ${req.body.email}`, 404)
            );
    }
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedResetCode = crypto
        .createHash('sha256')
        .update(resetCode)
        .digest('hex');

    //console.log(resetCode);
    //console.log(hashedResetCode);

    
};
    */
