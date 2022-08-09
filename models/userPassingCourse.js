const mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;


const schema = new Schema({
    userId: {
        type: String,
        required: true
    },
    courseId:{
        type: String,
        required: true
    },
    materialId: {
        type: String,
        required: true
    },
    score:{
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    }
});

exports.UserPassingCourses = mongoose.model('UserPassingCourses', schema);