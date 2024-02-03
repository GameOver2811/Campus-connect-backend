const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body} = require('express-validator');
const bcrypt = require('bcrypt');

router.post('/user',  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
  ], async(req,res)=>{
    try {

        const {name , collegeId, collegeName, phone, password,email} = req.body;

        // Check if a user with the given email exists
        const userExist = await User.findOne({ email: email});
        if(userExist) {
            return res.status(200).json({ message: 'User found!' });
        }

        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // If the user does not exist, create a new user
        const newUser = new User({
            name: name,
            collegeId: collegeId,
            phone: phone,
            email: email,
            collegeName: collegeName,
            password: hashedPassword
        });

        // Save the new user to the database
        newUser.save();

        return res.status(201).json({ message: 'User created successfully!' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
})

module.exports = router;

