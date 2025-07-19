const express = require('express');
const router = express.Router();
const Certification = require('../models/Certification');

// Get all certifications
router.get('/', async (req, res) => {
    try {
        const certifications = await Certification.find();
        res.json(certifications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single certification
router.get('/:id', async (req, res) => {
    try {
        const certification = await Certification.findById(req.params.id);
        if (!certification) return res.status(404).json({ message: 'Certification not found' });
        res.json(certification);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new certification
router.post('/', async (req, res) => {
    const certification = new Certification({
        name: req.body.name,
        issuingOrganization: req.body.issuingOrganization,
        issueDate: req.body.issueDate,
        expirationDate: req.body.expirationDate,
        credentialId: req.body.credentialId,
        credentialUrl: req.body.credentialUrl
    });
    try {
        const newCertification = await certification.save();
        res.status(201).json(newCertification);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a certification
router.patch('/:id', async (req, res) => {
    try {
        const certification = await Certification.findById(req.params.id);
        if (!certification) return res.status(404).json({ message: 'Certification not found' });

        if (req.body.name != null) certification.name = req.body.name;
        if (req.body.issuingOrganization != null) certification.issuingOrganization = req.body.issuingOrganization;
        if (req.body.issueDate != null) certification.issueDate = req.body.issueDate;
        if (req.body.expirationDate != null) certification.expirationDate = req.body.expirationDate;
        if (req.body.credentialId != null) certification.credentialId = req.body.credentialId;
        if (req.body.credentialUrl != null) certification.credentialUrl = req.body.credentialUrl;

        const updatedCertification = await certification.save();
        res.json(updatedCertification);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a certification
router.delete('/:id', async (req, res) => {
    try {
        const certification = await Certification.findById(req.params.id);
        if (!certification) return res.status(404).json({ message: 'Certification not found' });

        await Certification.deleteOne({ _id: req.params.id });
        res.json({ message: 'Certification deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
