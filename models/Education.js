const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    degree: {
        type: String,
        required: true,
        trim: true
    },
    institution: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: false
    },
    description: {
        type: String,
        required: false
    }
}, { timestamps: true });

const Education = mongoose.model('Education', educationSchema);

module.exports = Education;
