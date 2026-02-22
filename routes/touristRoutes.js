const express = require('express');

const router = express.Router();


router.get('/dashboard', (req, res) => {

    // if not logged in
    if (!req.user) {
        return res.redirect('/login');
    }

    // send user to EJS
    res.render('touristDashboard', {

        user: req.user

    });

});


module.exports = router;