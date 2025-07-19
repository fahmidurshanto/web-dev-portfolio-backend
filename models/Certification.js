const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    issuingOrganization: {
        type: String,
        required: true
    },
    issueDate: {
        type: Date,
        required: true
    },
    expirationDate: {
        type: Date,
        required: false
    },
    credentialId: {
        type: String,
        required: false
    },
    credentialUrl: {
        type: String,
        required: false
    }
}, { timestamps: true });

const Certification = mongoose.model('Certification', certificationSchema);

module.exports = Certification;
