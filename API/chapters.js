//const Course = require('models/course').Course;
const DeleteChapterMaterials = require('./materials').DeleteChapterMaterials;
const Chapter = require('models/chapter').Chapter;
//const async = require('async');

exports.post = async function (req, res, next) {
    let courseId = req.params.cid;
    let chapter = new Chapter({
        courseId: courseId,
        title: 'New Chapter',
        index: await getCourseChapterCount(courseId, next)
    });
    chapter.save(function (err) {
        if (err) return next(err);
        res.send(chapter);
    });
};

function getCourseChapterCount(courseId, next) {
    return new Promise(resolve => {
        Chapter.find({courseId: courseId}, function (err, chapters) {
            if (err) return next(err);
            if (chapters) {
                resolve(chapters.length);
            }
        });
    });
}

exports.put = function (req, res, next) {
    let courseId = req.params.cid;
    let chapterId = req.body._id;
    let title = req.body.title;
    let index = req.body.index;

    Chapter.findById(chapterId, function (err, chapter) {
        if (err) return next(err);
        if (chapter && chapter.index != index) {
            if (chapter.index < index) {
                Chapter.updateMany(
                    {courseId: courseId, $and: [{index: {$gt: chapter.index}}, {index: {$lte: index}}]},
                    {$inc: {index: -1}}, function (err, result) {
                        if (err) return next(err);
                    }
                )
            } else {
                Chapter.updateMany(
                    {courseId: courseId, $and: [{index: {$gte: index}}, {index: {$lt: chapter.index}}]},
                    {$inc: {index: 1}}, function (err, result) {
                        if (err) return next(err);
                    }
                )
            }
        }
    }).then(_ => {
        Chapter.updateOne({_id: chapterId}, {$set: {title: title, index: index}}, function (err, chapter) {
        });
        res.send('OK');
    });
};

exports.delete = function (req, res, next) {
    let courseId = req.params.cid;
    let chapterId = req.body._id;

    Chapter.findById(chapterId, function (err, chapter) {
        if (err) return next(err);
        if (chapter) {
            Chapter.updateMany(
                {$and: [{courseId: courseId}, {index: {$gt: chapter.index}}]},
                {$inc: {index: -1}}, function (err, result) {
                    if (err) return next(err);
                }
            );
        }
    });

    DeleteChapterMaterials(chapterId, next);

    Chapter.deleteOne({_id: chapterId}, function (err) {
        if (err) return next(err);
    });
};