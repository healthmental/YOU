const express = require("express");
const { body } = require("express-validator");
const User = require("../models/user");
const authController = require("../controllers/auth");
const multerConfig = require("../config/multer");
const router = express.Router();

router.post(
  "/signup/User",
  multerConfig.single("profileImage"),
  [
    body("firstName").trim().not().isEmpty(),
    body("lastName").trim().not().isEmpty(),
    body("mobilePhone").not().isEmpty().withMessage("Please enter valid phone number").isInt(),
    body("gender").not().isEmpty().withMessage("please enter Male or Female").isIn(["male", "female"]),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-mail adress already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("trustContact").not().isEmpty(),
    body("contactRelation").not().isEmpty(),
    body("medicalHistory").not().isEmpty(),
  ],
  authController.signupUser
);

router.post(
  "/signup/doctor",
  multerConfig.single("profileImage"),
  [
    body("firstName").trim().not().isEmpty(),
    body("lastName").trim().not().isEmpty(),
    body("mobilePhone").not().isEmpty().withMessage("Please enter valid phone number").isInt(),
    body("gender").not().isEmpty().withMessage("please enter Male or Female").isIn(["male", "female"]),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-mail adress already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("profession").not().isEmpty(),
    body("languages").not().isEmpty(),
    body("licIssuedDate").not().isEmpty(),
    body("licExpiryDate").not().isEmpty(),
  ],
  authController.signupDoctor
);

router.post("/login", authController.login);

module.exports = router;
