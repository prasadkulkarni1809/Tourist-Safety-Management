// middlewares/redirectIfAuthenticated.js

module.exports = function redirectIfAuthenticated(req, res, next) {

    if (req.isAuthenticated()) {

        if (req.user.role === 'tourist') {
            return res.redirect('/tourist/dashboard');
        }

        if (req.user.role === 'authority') {
            return res.redirect('/authority/dashboard');
        }

        if (req.user.role === 'admin') {
            return res.redirect('/admin/dashboard');
        }
    }

    next();
};