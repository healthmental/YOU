const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const sendEmail = require("../utils/sendEmail");

exports.signupUser = async (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const name = `${firstName} ${lastName}`;
  const mobilePhone = req.body.mobilePhone;
  const gender = req.body.gender;
  const email = req.body.email;
  const password = req.body.password;
  const birthDate = req.body.birthDate;
  const trustContact = req.body.trustContact;
  const contactRelation = req.body.contactRelation;
  const medicalHistory = req.body.medicalHistory;
  const sessions = req.body.sessions;
  const imageURL = req.file.path;

  try {
    console.log(req.file);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const hashedPW = await bcrypt.hash(password, 12);
    const verificationCode = generateCode();
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
      image: imageURL,
      role: "user",
      code: verificationCode,
    });

    const result = await user.save();

    await sendEmail(email, "Email Verification", `Your verification code is ${verificationCode}`);
    return res.status(201).json({ message: "User created!", id: result._id });
  } catch (err) {
    next(err);
  }
};

const generateCode = () => {
  return Math.floor(1000 + Math.random() * 9000);
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
  const imageURL = req.file.path;

  try {
    console.log(req.file);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const hashedPW = await bcrypt.hash(password, 12);
    const verificationCode = generateCode();
    const user = new User({
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
      image: imageURL,
      role: "doctor",
      code: verificationCode,
    });

    const result = await user.save();
    return res.status(201).json({ message: "Doctor created!", id: result._id });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("A user with this email could not be found.");
      error.statusCode = 401;
      throw error;
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("incorrect password!");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id.toString() }, "mysupersecret", { expiresIn: "1d" });
    return res.status(200).json({
      message: "login successful",
      token: token,
      id: user._id,
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
