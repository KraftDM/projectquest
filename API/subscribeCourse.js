const HashesLinkCourse = require('models/hashesLinkCourse').HashesLinkCourse;
const UserCourseRelation = require('models/userCourseRelation').UserCourseRelation;
const Courses = require('models/course').Course

exports.post = function (req, res, next) {
    let hash = req.body.hash;
    let userId = req.session.user._id;
    HashesLinkCourse.findOne({hashedLink: hash}, function (err, hsl) {
        if(err) return next(err);
        if(hsl){
            UserCourseRelation.findOne({courseId: hsl.courseId, userId: userId}, function (err, relation) {
                if(err) return next(err);
                if(relation){
                    if(relation.relation == 'passing'){
                        res.status = 402;
                        res.send('Данный курс уже находится в вашем списке активных');
                    } else {
                        //TODO: What should I do if the course has already been completed before?
                    }
                } else {
                    let sub = new UserCourseRelation({userId: userId, courseId: hsl.courseId});
                    sub.save(function (err) {
                        if(err) return next(err);
                        Courses.findById(hsl.courseId, function (err, result) {
                            if(err) return next(err);
                                res.send(result);
                        });
                    })
                }
            })
        } else {
            res.send({msg: "Курс не запушен или не существует"});
        }
    })
};


