const UserPassingCourse = require('models/userPassingCourse').UserPassingCourses;
const Material = require('models/material').Material;
const Answer = require('models/answer').Answer;

exports.get = function (req, res, next) {
    let userId = req.session.user._id;
    UserPassingCourse.find({userId: userId}, function (err, results) {
        if (err) return next(err);
        if (results) {
            res.send(results);
        } else {
            res.sendStatus(402)
        }
    })
};

exports.post = function (req, res, next) {
    let userId = req.session.user._id;
    let courseId = req.params.cid;
    let complete = req.body.complete;
    let materialId = complete.materialId;
    if (complete.type == 'info') {
        Material.findById(materialId, function (err, result) {
            if (err) return next(err);
            if (result) {
                let passing = new UserPassingCourse({
                    userId: userId,
                    materialId: materialId,
                    courseId: courseId,
                    score: result.score
                });
                passing.save();
                res.send({score: result.score.toString()});
            }
        });
    } else {
        let questions = complete.questions;
        let bscore = 0;
        let uscore = 0;
        new Promise(resolve => {
            Material.findById(materialId, function (err, result) {
                if (err) return next(err);
                if (result) {
                    resolve(result.score);
                }
            })
        }).then(async resolve => {
            bscore = resolve;
            let a = await tt(questions, bscore);
            uscore = a;
            let passing = new UserPassingCourse({
                userId: userId,
                materialId: materialId,
                courseId: courseId,
                score: uscore
            });
            passing.save();
            res.send({score: uscore.toString()});
        });
    }
};

function tt(questions, bscore) {
    return new Promise(resolve => {
        let actions = questions.map(async function (object) {
            let right = await ll(object, bscore, questions.length);
            return right;
        });
        let results = Promise.all(actions);
        results.then(data => {
            let a = data.reduce((a, b) => a + b, 0);
            resolve(a);
        });
    })
}


function ll(question, bscore, questionsl) {
    return new Promise(resolve => {
        Answer.find({questionId: question._id}, async function (err, bdAnswers) {
            if (err) return next(err);
            if (bdAnswers) {
                if (question.type != 'text') {
                    let right = await checkQuestion(question.answers, bdAnswers);
                    if (right == true) {
                        let y = bscore / questionsl;
                        resolve(y);
                    } else resolve(0);
                } else {
                    if (bdAnswers[0].answer == question.answers[0].answer) {
                        let y = bscore / questionsl;
                        resolve(y);
                    } else {
                        resolve(0);
                    }
                }
            }
        });
    })
}

function checkQuestion(userAnswers, dbAnswers) {
    return new Promise(resolve => {

        let actions = dbAnswers.map(async function (object) {
            if (object.right == getAnswerById(userAnswers, object._id).right) {
                return true;
            } else return false;
        });

        let results = Promise.all(actions);
        results.then(data => {
            if (typeof data.filter(a => a == false)[0] == 'undefined')
                resolve(true);
            else
                resolve(false);
        });
    });
}

function getAnswerById(userAnswers, id) {
    return userAnswers.filter(answer => answer._id == id)[0];
}