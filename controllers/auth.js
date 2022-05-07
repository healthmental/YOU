const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const Doctor = require("../models/doctor")
const cloud = require('../config/cloudinary')

exports.signupUser = async (req, permission, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const name = firstName+ ' ' + lastName;
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
        console.log(req.file.path,req.file);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.')
            error.statusCode = 422
            error.data = errors.array();
            throw error;
        }
        const hashedPW = await bcrypt.hash(password, 12);
        const imageResult = await cloud.uploads(req.file.path)
        console.log(imageResult, image)
        image = imageResult.url
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
            permission: permission,
            image: image
        })
        const result = await user.save();
        res.status(201).json({ message: 'User created!', userId: result._id  });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }       
}

exports.signupDoctor = async (req, permission, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const name = firstName + ' ' + lastName;
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
        console.log(req.file.path,req.file);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.')
            error.statusCode = 422
            error.data = errors.array();
            throw error;
        }
        const hashedPW = await bcrypt.hash(password, 12);
        const user = new Doctor({
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
        permission: permission,
        image: image
        });
        const result = await user.save();
        res.status(201).json({ message: 'Doctor created!', userId: result._id });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.authPage =  (permissions) => {
    return(req ,res , next) => {
        const userRole = req.body.permission
        if(permissions.includes(userRole)) {
            next()
        } else {
            const error = new Error('You dont have permission!')
            error.statusCode = 401;
            throw error;
        }
    }
}

exports.login = async (req, permission ,res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }
        //==
        if (user.permission !== permission ){
            return res.json({ message: "You are not alowed to this gate" });
        }
        loadedUser = user;
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('incorrect password!')
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign(
            {
                email: loadedUser.email,
                userId: loadedUser._id.toString()
            },
            'mysupersecret',
            { expiresIn: "1d" }
        );
        res.status(200).header('token',token).json({
            message: "login successful",
            token:token
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }    
}