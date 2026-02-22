const express = require('express');
const router = express.Router();

const isAuthenticated = require('../middlewares/isAuthenticated');
const checkRole = require('../middlewares/checkrole');

// 🔥 PROTECTED DASHBOARD
router.get(
  '/dashboard',
  isAuthenticated,
  checkRole('tourist'),
  (req, res) => {
    res.render('touristDashboard', {
      user: req.user
    });
  }
);

module.exports = router;