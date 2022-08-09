const mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

const schema = new Schema({
    materialId: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

exports.Question = mongoose.model('Question', schema);