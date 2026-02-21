const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');


// GET Register Page
router.get('/register', (req, res) => {
    res.render('register');
});


// POST Register User
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('register', { error: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();

        res.redirect('/login');

    } catch (error) {
        console.log(error);
        res.send('Something went wrong');
    }
});

module.exports = router;