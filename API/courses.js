const Course = require('models/course').Course;
const Chapter = require('models/chapter').Chapter;

exports.post = function (req, res, next) {
    let user = req.session.user;
    let course = new Course({ title: 'Untitled', description: 'No description', userId: user._id });
    course.save(function (err) {
        if(err) return next(err);
        let chapter = new Chapter({ courseId: course._id, title: 'Chapter One', index: 0 });
        chapter.save(function (err) {
           if(err) return next(err);
        });
        res.send(course);
    });
};

exports.put = function (req, res, next) {
    let courseId = req.body._id;
    let title = req.body.title;
    let description = req.body.description;
    //let index = req.body.index;

    Course.findById(courseId, function (err, material) {
        //* if (err) return next(err);
    }).then(_ => {
        Course.updateOne({_id: courseId}, {$set: {title: title, description: description}}, function (err, material) {
        });
        res.send('OK');
    });
};