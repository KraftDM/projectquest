const mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;


const schema = new Schema({
    userId: {
        type: String,
        required: true
    },
    answerId: {
        type: String,
        required: true
    },
    right: {
        type: Boolean,
        required: true
    }
});

exports.UserAnswersCourses = mongoose.model('UserAnswersCourses', schema);