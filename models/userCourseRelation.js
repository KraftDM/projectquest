const mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

const schema = new Schema({
    userId: {
        type: String,
        required: true
    },
    courseId: {
        type: String,
        required: true
    },
    relation: {
        type: String,
        default: 'passing'
    }
});

exports.UserCourseRelation = mongoose.model('UserCourseRelation', schema);