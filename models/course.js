const mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

const schema = new Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

exports.Course = mongoose.model('Course', schema);