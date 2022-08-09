const User = require('models/user').User;
const async = require('async');
const HttpError = require('error').HttpError;

exports.get = function (req, res){
    res.render('login');
};

exports.post = function (req, res, next){
    let mail = req.body.mail;
    let password = req.body.password;

    User.findOne({mail: mail}, function (err, user) {
        if(err) return next(err);
        if(user){
            if(user.checkPassword(password)){
                req.session.user = user;
                res.status(200);
                res.send(user);
            } else {
                res.sendStatus(403);
            }
        } else {
            res.sendStatus(402);
        }
    });
};