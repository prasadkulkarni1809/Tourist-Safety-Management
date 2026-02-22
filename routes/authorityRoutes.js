const express = require('express');
const router = express.Router();

const isAuthenticated = require('../middlewares/isAuthenticated');
const checkRole = require('../middlewares/checkrole'); // ⚠️ Case-sensitive!

// 🔐 Protected Authority Dashboard
router.get(
  '/dashboard',
  isAuthenticated,
  checkRole('authority'),
  (req, res) => {
    res.render('authority/dashboard', {
      user: req.user
    });
  }
);

module.exports = router;