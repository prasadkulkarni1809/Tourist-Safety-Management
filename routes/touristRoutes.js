const express = require('express');
const router = express.Router();

const isAuthenticated = require('../middlewares/isAuthenticated');
const checkRole = require('../middlewares/checkrole');

router.get(
  '/dashboard',
  isAuthenticated,
  checkRole('tourist'),
  (req, res) => {
    res.render('tourist/dashboard', {
      user: req.user
    });
  }
);
// Report Page
router.get(
  '/report',
  isAuthenticated,
  checkRole('tourist'),
  (req, res) => {
    res.send("Report Page Coming Soon");
  }
);

// My Reports Page
router.get(
  '/my-reports',
  isAuthenticated,
  checkRole('tourist'),
  (req, res) => {
    res.send("My Reports Page Coming Soon");
  }
);

// Safe Zones Page
router.get(
  '/safe-zones',
  isAuthenticated,
  checkRole('tourist'),
  (req, res) => {
    res.send("Safe Zones Page Coming Soon");
  }
);

router.get("/panic", async (req, res) => {

    // Later we can:
    // - Save emergency record
    // - Capture location
    // - Notify admin
    // - Send SMS

    console.log("🚨 PANIC ALERT TRIGGERED by:", req.user.name);

    res.send("Emergency Alert Sent Successfully 🚨");
});

module.exports = router;