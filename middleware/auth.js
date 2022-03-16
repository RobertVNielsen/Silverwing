module.exports = (req, res, next) => {
    if (!req.session.loggedIn) {
        return res.redirect('../authentication/login');
    }
    next();
}
