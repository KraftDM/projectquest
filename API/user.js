const User = require('models/user').User;

exports.get = function (req, res, next) {
    if (req.session.user == null) {
        res.sendStatus(402);
    } else {
        let userId = req.session.user._id;
        User.findById(userId, function (err, user) {
            if (err) return next(err);
            if (user) {
                res.status = 200;
                res.send(user);
            }
        });
    }
};