const mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

const schema = new Schema({
    chapterId: {
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: false
    },
    index: {
        type: Number,
        required: true
    },
    days: {
        type: Number,
        default: 0
    },
    score: {
        type: Number,
        default: 0
    }
});

exports.Material = mongoose.model('Material', schema);