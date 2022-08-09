const HashesLinkCourse = require('models/hashesLinkCourse').HashesLinkCourse;
const OpenCourse = require('models/openCourse').OpenChapter;
const Material = require('models/material').Material;
const Chapter = require('models/chapter').Chapter;
const cc = require('./courseContent')


exports.post = async function (req, res, next) {
    let courseId = req.params.cid;
    let hls = new HashesLinkCourse({courseId: courseId, hashedLink: createHashedLink(courseId)});
    hls.save(async function (err) {
        if (err) return next(err);
        let open = new OpenCourse({
            courseId: courseId,
            dateStart: new Date(),
            dateEnd: await calcDayEndCourse(courseId, new Date(), next)
        });
        open.save(function (err) {
            if (err) return next(err);
            res.send({hashe: hls.hashedLink, open: open});
        });
    });
};

function calcDayEndCourse(courseId, start, next) {
    return new Promise(async resolve => {
        let date = start;
        let chapters = await findObjects({courseId: courseId}, Chapter, next);
        let materials = await findObjectsForeach(chapters, 'chapterId', Material, next);
        materials.forEach(material => {
            date.setDate(date.getDate() + material.days);
        });
        resolve(date);
    });
}

exports.get = function (req, res, next) {
    let courseId = req.params.cid;
    HashesLinkCourse.findOne({courseId: courseId}, function (err, hsc) {
        if (err) return next(err);
        if (hsc)
            res.send({hash: hsc.hashedLink});
        else
            res.sendStatus(402);
    })
};

function getPieceHashes(piece1, piece2) {
    return (piece1 * piece2).toString(36);
}

function createHashedLink(courseId) {
    let dt = (+(new Date)).toString();
    let chashes1 = parseInt(courseId.substring(0, courseId.length / 2 - 4), 16);
    let hashes1 = parseInt(dt.substring(0, dt.length / 2), 16);
    let chashes2 = parseInt(courseId.substring(courseId.length / 2 + 4, courseId.length), 16);
    let hashes2 = parseInt(dt.substring(dt.length / 2, dt.length), 16);
    return '' + getPieceHashes(chashes1, hashes1) + getPieceHashes(chashes2, hashes2) + getPieceHashes(chashes1, hashes2);
}
