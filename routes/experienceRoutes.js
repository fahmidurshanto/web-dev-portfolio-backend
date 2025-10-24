const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');

// Get all experiences
router.get('/', async (req, res) => {
    try {
        const experiences = await Experience.find().sort({ createdAt: -1 });
        res.json(experiences);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single experience
router.get('/:id', async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) return res.status(404).json({ message: 'Experience not found' });
        res.json(experience);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new experience
router.post('/', async (req, res) => {
    const experience = new Experience({
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        description: req.body.description,
        date: req.body.date,
        type: req.body.type,
        skills: req.body.skills || [],
        icon: req.body.icon
    });
    try {
        const newExperience = await experience.save();
        res.status(201).json(newExperience);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an experience
router.patch('/:id', async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) return res.status(404).json({ message: 'Experience not found' });

        if (req.body.title != null) experience.title = req.body.title;
        if (req.body.company != null) experience.company = req.body.company;
        if (req.body.location != null) experience.location = req.body.location;
        if (req.body.description != null) experience.description = req.body.description;
        if (req.body.date != null) experience.date = req.body.date;
        if (req.body.type != null) experience.type = req.body.type;
        if (req.body.skills != null) experience.skills = req.body.skills;
        if (req.body.icon != null) experience.icon = req.body.icon;

        const updatedExperience = await experience.save();
        res.json(updatedExperience);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an experience
router.delete('/:id', async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) return res.status(404).json({ message: 'Experience not found' });

        await Experience.deleteOne({ _id: req.params.id });
        res.json({ message: 'Experience deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;