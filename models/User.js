const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    // Profile information
    fullName: {
        type: String,
        required: false,
        trim: true
    },
    bio: {
        type: String,
        required: false
    },
    profilePicture: {
        type: String,
        required: false
    },
    socialLinks: {
        linkedin: String,
        github: String,
        twitter: String,
        website: String
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
