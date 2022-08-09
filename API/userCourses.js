const Course = require('models/course').Course;
const UserCourseRelation = require('models/userCourseRelation').UserCourseRelation;

exports.get = async function (req, res, next) {
    let userId = req.params.uid;
    let json = {active: [], finish: [], create: []};

    json.create = await findCourses({userId: userId}, Course, next);
    findCourses({userId: userId}, UserCourseRelation, next).then( async relations => {
        json.finish = await findCoursesForeach(relations.filter(relation=> relation.relation == 'finishing'), '_id', 'courseId', Course, next);
        json.active = await findCoursesForeach(relations.filter(relation=> relation.relation == 'passing'), '_id', 'courseId', Course, next);
        res.send(json);
    })
};

findCoursesForeach = function findCoursesForeach(objects, key1, key2, DB, next) {
    return new Promise(resolve => {
        let obj = {};
        let actions = objects.map(async function  (object) {
            obj[key1] = object[key2];
            let course = await findCourses(obj, DB, next);
            return  course;
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

findCourses = function findCourses(obj, DB, next) {
    return new Promise(resolve => {
        DB.find(obj, function (err, objects) {
            if (err) return next(err);
            if (objects) {
                resolve(objects);
            }
        });
    });
};