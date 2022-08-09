const mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

const schema = new Schema({
    questionId: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    right: {
        type: Boolean,
        default: false
    }
});

exports.Answer = mongoose.model('Answer', schema);