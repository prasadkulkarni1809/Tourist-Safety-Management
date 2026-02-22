// ------------------ Import Packages ------------------

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const session = require('express-session');
const passport = require('./config/passport');


// ------------------ Create Express App ------------------

const app = express();


// ------------------ Import Routes ------------------

const authRoutes = require('./routes/authRoutes');
const policeRoutes = require('./routes/policeRoutes');
const touristRoutes = require('./routes/touristRoutes');
const authorityRoutes = require('./routes/authorityRoutes');



// ------------------ MongoDB Connection ------------------

mongoose.connect('mongodb://127.0.0.1:27017/touristSafety')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// ------------------ View Engine ------------------

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// ------------------ Middleware ------------------

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


// ------------------ Session Middleware ------------------

app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false
}));


// ------------------ Passport Middleware ------------------

app.use(passport.initialize());
app.use(passport.session());


// ------------------ Routes ------------------

app.use('/', authRoutes);

app.use('/police', policeRoutes);

app.use('/tourist', touristRoutes);

app.use('/authority', authorityRoutes);


// ------------------ Page Routes ------------------

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});


// ------------------ Server ------------------

app.listen(3000, () => {
    console.log('Server running on port 3000');
});