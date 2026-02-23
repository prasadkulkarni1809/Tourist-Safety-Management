const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const router = express.Router();

const User = require('../models/User');


// ================= REGISTER =================

router.post('/register', async (req, res) => {

try {

const { name, email, password, role } = req.body;

const existingUser = await User.findOne({ email });

if(existingUser)
return res.render('register', { error: 'Email already exists' });

const hashedPassword = await bcrypt.hash(password, 10);

const newUser = new User({

name,
email,
password: hashedPassword,
role

});

await newUser.save();

res.redirect('/login');

}

catch(err){

console.log(err);

res.send("Registration Error");

}

});


// ================= LOGIN =================

router.post('/login', (req, res, next) => {

passport.authenticate('local', (err, user, info) => {

if (err) return next(err);


if (!user) {

return res.render('login', {

error: info.message

});

}


req.login(user, (err) => {

if (err) return next(err);


if(user.role === "tourist")
return res.redirect('/tourist/dashboard');

else if(user.role === "police")
return res.redirect('/police/dashboard');

else if(user.role === "authority")
return res.redirect('/authority/dashboard');

});

})(req, res, next);

});

module.exports = router;


// // ================= REGISTER =================

// router.post('/register', async (req, res) => {

// try {

// const { name, email, password, role } = req.body;


// // check if user exists

// const existingUser = await User.findOne({ email });

// if(existingUser) {

// return res.render('register', { error: 'Email already exists' });

// }


// // hash password

// const hashedPassword = await bcrypt.hash(password, 10);


// // save user

// const newUser = new User({

// name,
// email,
// password: hashedPassword,
// role

// });

// await newUser.save();


// // redirect to login

// res.redirect('/login');

// }

// catch(err) {

// console.log(err);

// res.send("Registration error");

// }

// });


// // ================= LOGIN =================

// router.post('/login', (req, res, next) => {

// passport.authenticate('local', (err, user, info) => {


// // login failed

// if (err) return next(err);

// if (!user) {

// return res.render('login', { error: "Invalid email or password" });

// }


// // create session

// req.login(user, (err) => {

// if (err) return next(err);


// // role based redirect

// if(user.role === "tourist") {

// return res.redirect('/tourist/dashboard');

// }

// else if(user.role === "police") {

// return res.redirect('/police/dashboard');

// }

// else if(user.role === "authority") {

// return res.redirect('/authority/dashboard');

// }

// else {

// return res.redirect('/');

// }

// });

// })(req, res, next);

// });


// module.exports = router;