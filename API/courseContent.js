const Chapter = require('models/chapter').Chapter;
const Material = require('models/material').Material;
const Question = require('models/question').Question;
const Answer = require('models/answer').Answer;

exports.get = async function (req, res, next) {
    let courseId = req.params.cid;
    if (typeof courseId != 'undefined') {
        let json = {courseId: courseId};
        json.chapters = await findObjects({courseId: courseId}, Chapter, next);
        json.materials = await findObjectsForeach(json.chapters, 'chapterId', Material, next);
        json.questions = await findObjectsForeach(json.materials, 'materialId', Question, next);
        json.answers = await findObjectsForeach(json.questions, 'questionId', Answer, next);
        res.send(json);
    } else {
        res.sendStatus(402);
    }
};

findObjectsForeach = function findObjectsForeach(objects, key, DB, next) {
    return new Promise(resolve => {
        let obj = {};
        let actions = objects.map(function (object) {
            obj[key] = object._id;
            return findObjects(obj, DB, next);
        });

        let results = Promise.all(actions);
        results.then(data => {
                let array = [];
                data.forEach(arr => {
                    array = array.concat(arr);
                });
                resolve(array);
            }
        );
    });
};

findObjects = function findObjects(object, DB, next) {
    return new Promise(resolve => {
        DB.find(object, function (err, objects) {
            if (err) return next(err);
            if (objects) {
                resolve(objects);
            }
        });
    });
};

exports.findObjectsForeach = findObjectsForeach;
exports.findObjects = findObjects;

exports.post = function (req, res, next) {
    let courseId = req.params.cid;

    let chapters = req.body.chapters;
    let materials = req.body.materials;
    let questions = req.body.questions;
    let answers = req.body.answers;

    saveCourseContent(chapters, Chapter, next);
    saveCourseContent(materials, Material, next);
    saveCourseContent(questions, Question, next);
    saveCourseContent(answers, Answer, next);
};

function saveCourseContent(objects, BD, next) {
    objects.forEach(object => {
        let obj = new BD(object);
        obj.save(function (err) {
            if (err) return next(err);
        });
    });
}