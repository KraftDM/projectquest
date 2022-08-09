const mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

const schema = new Schema({
    courseId: {
        type: String,
        required: true
    },
    hashedLink: {
        type: String,
        unique: true,
        required: true
    },
    numberSeats: {
        type: String,
        default: 20
    }
});

exports.HashesLinkCourse = mongoose.model('HashesLinkCourse', schema);