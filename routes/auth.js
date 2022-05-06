const express = require('express');
const { body } = require("express-validator");
const User = require('../models/user');
const authController = require('../controllers/auth');
const multerConfig = require('../config/multer');
const router = express.Router();

// // http://localhost:8080/auth/signup/User  method "POST"
// https://healthmental.herokuapp.com/auth/signup/User  [Api-endpoint]
router.post(
  "/signup/User",
  multerConfig.single('profileImage'),
  [
    body("firstName")
      .trim()
      .not()
      .isEmpty(),
    body("lastName")
      .trim()
      .not()
      .isEmpty(),
    body("mobilePhone")
      .not()
      .isEmpty()
      .withMessage("Please enter valid phone number")
      .isInt(),
    body("gender")
      .not()
      .isEmpty()
      .withMessage("please enter Male or Female")
        .isIn(["male", "female"]),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject("E-mail adress already exists!");
          }
        }); 
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 5 }),
    body("trustContact")
      .not()
      .isEmpty(),
    body("contactRelation")
      .not()
      .isEmpty(),
    body("medicalHistory")
      .not()
      .isEmpty(),
  ],
  async (req ,res ,next) => {
    await authController.signupUser(req, "User", res , next)
  }
  
);

// http://localhost:8080/auth/signup/Doctor  method "POST"
// https://healthmental.herokuapp.com/auth/signup/Doctor  [API-endpoint]
router.post(
  "/signup/Doctor",
  multerConfig.single('profileImage'),
  [
    body("firstName")
      .trim()
      .not()
      .isEmpty(),
    body("lastName")
      .trim()
      .not()
      .isEmpty(),
    body("mobilePhone")
      .not()
      .isEmpty()
      .withMessage("Please enter valid phone number")
      .isInt(),
    body("gender")
      .not()
      .isEmpty()
      .withMessage("please enter Male or Female")
      .isIn(["male", "female"]),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject("E-mail adress already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 5 }),
    body("profession")
      .not()
      .isEmpty(),
    body("languages")
      .not()
      .isEmpty(),
    body("licIssuedDate")
      .not()
      .isEmpty(),
    body("licExpiryDate")
      .not()
      .isEmpty(),
  ],async (req, res, next) => {
    await authController.signupDoctor(req,"Doctor", res, next);
  }
);
// http://localhost:8080/auth/login/User  method "POST"
// https://healthmental.herokuapp.com/auth/login/User [API-endpoint]
router.post('/login/User',
  async (req, res, next) => {
    await authController.login(req, "User", res, next)
  }
)
//http://localhost:8080/auth/login/Doctor  method "POST"
router.post('/login/Doctor',
  async (req, res, next) => {
  await authController.login(req, "Doctor", res, next);
}
);
module.exports = router;