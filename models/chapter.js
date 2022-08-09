const mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

const schema = new Schema({
    courseId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    index: {
        type: Number,
        required: true
    }
});

exports.Chapter = mongoose.model('Chapter', schema);