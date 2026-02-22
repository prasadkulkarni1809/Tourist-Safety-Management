const express = require('express');

const router = express.Router();


router.get('/dashboard', (req, res) => {

res.render('policeDashboard', {

user: req.user

});

});


router.get('/dashboard', (req, res) => {

res.render('policeDashboard', {

user: req.user

});

});


module.exports = router;