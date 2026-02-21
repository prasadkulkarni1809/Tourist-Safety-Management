const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const router = express.Router();
const User = require('../models/User');


// REGISTER

router.post('/register', async (req, res) => {

const { name, email, password, role } = req.body;

const existingUser = await User.findOne({ email });

if(existingUser)
return res.render('register', {error:'Email exists'});

const hashedPassword = await bcrypt.hash(password,10);

const newUser = new User({

name,
email,
password:hashedPassword,
role

});

await newUser.save();

res.redirect('/login');

});


// LOGIN

router.post('/login',

passport.authenticate('local',{

successRedirect:'/',

failureRedirect:'/login'

})

);


module.exports = router;