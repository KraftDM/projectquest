const Chapter = require('models/chapter').Chapter;
const Material = require('models/material').Material;
const UserPassingCourse = require('models/userPassingCourse').UserPassingCourses;
const cc = require('./courseContent');

exports.get = async function (req, res, next) {
    let courseId = req.params.cid;
    let userId = req.session.user._id;
    let json = {courseId: courseId, score: []};

    json.chapters = await cc.findObjects({courseId: courseId}, Chapter, next);
    json.materials = await cc.findObjectsForeach(json.chapters, 'chapterId', Material, next);
    new Promise(resolve => {
        let actions = json.materials.map(function (object) {
            return findPassings({userId: userId, materialId: object._id}, UserPassingCourse, next);
        });

        let results = Promise.all(actions);
        results.then(data => {
            let array = [];
            data.forEach(arr => {
                array = array.concat(arr);
            });
            resolve(array);
        });
    }).then(result => {
            json.score = result;
            res.send(json);
        }
    );
};


findPassings = function findCourses(obj, DB, next) {
    return new Promise(resolve => {
        DB.find(obj, function (err, objects) {
            if (err) return next(err);
            if (objects) {
                resolve(objects);
            }
        });
    });
};

exports.findPassings = findPassings;