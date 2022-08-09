const Course = require('models/course').Course;

exports.get = function (req, res, next) {
    if(typeof req.session.user == 'undefined'){
        res.redirect("../login");
        return;
    }
    let user = req.session.user;
    let courseId = req.params.cid;
    Course.findById(courseId, function (err, course) {
        if(err) return next(err);
        if(course){
           if (course.userId == user._id){
               res.render('constructor', { course: course , user: user});
           }
        }
    });
};