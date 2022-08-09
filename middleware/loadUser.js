const User = require('models/user').User;

module.exports = function (req, res, next) {
    if(!req.session) return next();

    User.findById(req.session.user, function (err, user) {
        req.user = res.locals.user = user;
        next();
    });
};