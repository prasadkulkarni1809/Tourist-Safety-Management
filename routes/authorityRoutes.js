const express = require('express');

const router = express.Router();


// Authority Dashboard route
router.get('/dashboard', (req, res) => {

    // if not logged in
    if (!req.user) {
        return res.redirect('/authority/login');
    }

    // send authority to EJS
    res.render('authorityDashboard', {

        user: req.user

    });

});


module.exports = router;