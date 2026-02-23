const express = require('express');
const router = express.Router();
const Incident = require('../models/Incident');
const User = require('../models/User');
const isAuthenticated = require('../middlewares/isAuthenticated');
const checkRole = require('../middlewares/checkrole'); // ⚠️ Case-sensitive!

// 🔐 Protected Authority Dashboard
router.get('/dashboard',  checkRole('authority'), async (req, res) => {

  const activeCount = await Incident.countDocuments({ status: 'active' });
  const resolvedCount = await Incident.countDocuments({ status: 'resolved' });
  const pendingCount = await Incident.countDocuments({ status: 'pending' });

  const touristCount = await User.countDocuments({ role: 'tourist' });

  const recentIncidents = await Incident.find()
    .populate('tourist')
    .sort({ createdAt: -1 })
    .limit(5);

  res.render('authority/dashboard', {
    user: req.user,
    activeCount,
    resolvedCount,
    pendingCount,
    touristCount,
    recentIncidents
  });

});


module.exports = router;