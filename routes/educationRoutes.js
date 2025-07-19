const express = require('express');
const router = express.Router();
const Education = require('../models/Education');

// Get all education entries
router.get('/', async (req, res) => {
    try {
        const education = await Education.find();
        res.json(education);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single education entry
router.get('/:id', async (req, res) => {
    try {
        const education = await Education.findById(req.params.id);
        if (!education) return res.status(404).json({ message: 'Education entry not found' });
        res.json(education);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new education entry
router.post('/', async (req, res) => {
    const education = new Education({
        degree: req.body.degree,
        institution: req.body.institution,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description
    });
    try {
        const newEducation = await education.save();
        res.status(201).json(newEducation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an education entry
router.patch('/:id', async (req, res) => {
    try {
        const education = await Education.findById(req.params.id);
        if (!education) return res.status(404).json({ message: 'Education entry not found' });

        if (req.body.degree != null) education.degree = req.body.degree;
        if (req.body.institution != null) education.institution = req.body.institution;
        if (req.body.startDate != null) education.startDate = req.body.startDate;
        if (req.body.endDate != null) education.endDate = req.body.endDate;
        if (req.body.description != null) education.description = req.body.description;

        const updatedEducation = await education.save();
        res.json(updatedEducation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an education entry
router.delete('/:id', async (req, res) => {
    try {
        const education = await Education.findById(req.params.id);
        if (!education) return res.status(404).json({ message: 'Education entry not found' });

        await Education.deleteOne({ _id: req.params.id });
        res.json({ message: 'Education entry deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
