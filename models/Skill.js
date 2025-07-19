const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    category: {
        type: String,
        required: true,
        enum: ['frontend', 'backend', 'database', 'tools', 'language', 'other']
    },
    
    icon: {
        type: String,
        required: false,
        trim: true
    }
}, { timestamps: true });

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;
