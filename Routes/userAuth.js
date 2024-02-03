const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

// Environment variable
const SECRET_KEY = "@@@@";

// Route - 01 ---> No login required
// PATH : http://localhost:3001/api/auth/usersignup

router.post('/usersignup',[
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('phone').isMobilePhone(),
    body('phone').isMobilePhone().isLength({ min: 10, max: 10 }),
], async (req, res) => {
    try {

        // Express validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // De-structuring input body
        const { name, collegeId, collegeName, phone, password, email } = req.body;

        // Check if a user with the given email exists
        const userExist = await User.findOne({ email: email });
        if (userExist) {
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

// Route - 02 ---> No login required
// PATH : http://localhost:3001/api/auth/userlogin

router.get('/userlogin',[
    body('email').isEmail(),
], async(req,res)=> {
    try {

        // Express validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {email, password} = req.body;

        // Checking Wheather user exists or not
        const user = await User.findOne({email : email});
        if(!user) {
            return res.status(200).json({ message: 'User Not found!' });
        }

        // Matching password
        const passMatch = await bcrypt.compare(password, user.password);
        if(!passMatch) {
            return res.status(400).json({ errors: "Enter correct details!"});
        }

        // Assigning AuthToken to the user
        const data = {
            user : user.name
        }
        const authToken = JWT.sign(data,SECRET_KEY);

        // Redirecting to Other page
        /* This has to be completed later */

        return res.json({authToken : authToken});

        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
})

module.exports = router;

