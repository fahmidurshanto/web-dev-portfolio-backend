const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: false
    },
    technologies: {
        type: [String],
        default: []
    },
    category: {
        type: String,
        required: true,
        enum: ['frontend', 'backend', 'database', 'fullstack', 'mobile', 'devops']
    }
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;