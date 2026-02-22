// middlewares/isAuthenticated.js

module.exports = function isAuthenticated(req, res, next) {

    // Passport adds this method
    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/login');
};