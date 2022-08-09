//const Chapter = require('models/chapter').Chapter;

const DeleteMaterialQuestions = require('./questions').DeleteMaterialQuestions;
const Material = require('models/material').Material;
//const async = require('async');

exports.post = async function (req, res, next) {
    let chapterId = req.body.chapterId;
    let type = req.body.type;
    let material = new Material({
        chapterId: chapterId,
        title: type == 'test' ? 'New Test' : 'New Material',
        type: type,
        text: '',
        index: await getChapterMaterialsCount(chapterId, next)
    });
    material.save();
    res.send(material);
};

function getChapterMaterialsCount(chapterId, next) {
    return new Promise(resolve => {
        Material.find({chapterId: chapterId}, function (err, materials) {
            if (err) return next(err);
            if (materials) {
                resolve(materials.length);
            }
        });
    });
}

exports.put = function (req, res, next) {
    let courseId = req.params.cid;
    let materialId = req.body._id;
    let title = req.body.title;
    let text = req.body.text;
    let days = req.body.days;
    let score = req.body.score;
    //let index = req.body.index;

    Material.findById(materialId, function (err, material) {
        //* if (err) return next(err);
    }).then(_ => {
        Material.updateOne({_id: materialId}, {$set: {title: title, text: text, days: days, score: score}}, function (err, material) {
        });
        res.send('OK');
    });
};


exports.delete = function (req, res, next) {
    let courseId = req.params.cid;
    let materialId = req.body._id;

    /*Chapter.findById(chapterId, function (err, chapter) {
        if (err) return next(err);
        if (chapter) {
            Chapter.updateMany(
                {$and: [{courseId: courseId}, {index: {$gt: chapter.index}}]},
                {$inc: {index: -1}}, function (err, result) {
                    if (err) return next(err);
                }
            );
        }
    });*/

    DeleteMaterialQuestions(materialId, next);

    Material.deleteOne({_id: materialId}, function (err) {
        if (err) return next(err);
    });
};

exports.DeleteChapterMaterials = function (chapterId, next) {

    Material.find({chapterId: chapterId}, function (err, materials) {
        materials.forEach(material => {
            DeleteMaterialQuestions(material._id, next);
        });
    });
    Material.deleteMany({chapterId: chapterId}, function (err) {
        if (err) return next(err);
    })
};