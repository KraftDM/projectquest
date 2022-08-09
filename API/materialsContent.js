const Material = require('models/material').Material;
const Question = require('models/question').Question;
const Answer = require('models/answer').Answer;
const  cc =  require('./courseContent');

exports.get = async function (req, res, next) {
    let materialId = req.params.mid;
    let json = {};
    if(typeof materialId != 'undefined') {
        Material.findById(materialId, async function (err, material) {
            if (err) return next(err);
            if (material) {
                json.questions = await cc.findObjectsForeach([material], 'materialId', Question, next);
                json.answers = await cc.findObjectsForeach(json.questions, 'questionId', Answer, next);
                res.send(json);
            }
        })
    } else {
        res.sendStatus(402);
    }
};
