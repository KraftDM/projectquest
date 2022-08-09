const Answer = require('models/answer').Answer;

exports.post = async function (req, res, next) {
    let questionId = req.body.questionId;
    let right = req.body.right;
    let answer = new Answer({
        questionId: questionId,
        answer: 'Answer',
        right: right
    });
    answer.save( function (err) {
        if (err) return next(err);
        res.send(answer);
    });
};

exports.put = function (req, res, next) {
    let courseId = req.params.cid;
    let answerId = req.body._id;
    let answer = req.body.answer;
    let right = req.body.type == 'text' ? true: req.body.right;
    //let index = req.body.index;

    Answer.findById(answerId, function (err, material) {
        // if (err) return next(err);
    }).then(_ => {
        Answer.updateOne( {_id: answerId},  {$set: {answer: answer, right: right}}, function (err, question) {});
        res.send('OK');
    });
};


exports.delete = function (req, res, next) {
    let courseId = req.params.cid;
    let answerId = req.body._id;

    Answer.deleteOne({_id: answerId}, function (err) {
        if (err) return next(err);
    });
};

exports.DeleteQuestionAnswers = function (questionId, next) {
    Answer.deleteMany({questionId: questionId}, function (err) {
        if (err) return next(err);
    })
};