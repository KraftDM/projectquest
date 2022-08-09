const User = require('models/user').User;

exports.get = function (req, res, next) {
    if (typeof req.session.user == 'undefined') {
        res.redirect("../../login");
        return;
    }
    let sessionUserId = req.session.user._id;
    let viewUserId = req.params.uid;
    let details = { user: req.session.user };
    if(sessionUserId == viewUserId) {
        details.privilege = 'edit';
        res.render('userCourses', details);
        return;
    } else {
        details.privilege = 'view';
        User.findById(viewUserId, function (err, user) {
            if(err) return next(err);
            if(user){
                details.viewUser = user;
                res.render('userCourses', req.session.user);
            }
        })
    }
};


