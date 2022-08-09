const DeleteQuestionAnswers = require('./answers').DeleteQuestionAnswers;
const Question = require('models/question').Question;

exports.post = async function (req, res, next) {
    let materialId = req.body.materialId;
    let type = req.body.type;
    let question = new Question({
        materialId: materialId,
        question: 'Question',
        type: type
    });
    question.save( function (err) {
        if(err) return next(err);
        res.send(question);
    })
};

exports.put = function (req, res, next) {
    let courseId = req.params.cid;
    let questionId = req.body._id;
    let question = req.body.question;
    //let index = req.body.index;

    Question.findById(questionId, function (err, material) {
        // if (err) return next(err);
    }).then(_ => {
        Question.updateOne( {_id: questionId},  {$set: {question: question}}, function (err, question) {});
        res.send('OK');
    });
};


exports.delete = function (req, res, next) {
    let courseId = req.params.cid;
    let questionId = req.body._id;

    DeleteQuestionAnswers(questionId, next);

    Question.deleteOne({_id: questionId}, function (err) {
        if (err) return next(err);
    });
};

exports.DeleteMaterialQuestions = function (materialId, next) {
    Question.find({materialId: materialId}, function (err, questions) {
        questions.forEach(question => {
            DeleteQuestionAnswers(question._id, next);
        });
    });
    Question.deleteMany({materialId: materialId}, function (err) {
        if (err) return next(err);
    })
};