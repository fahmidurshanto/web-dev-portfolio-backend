const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');

// Get all skills
router.get('/', async (req, res) => {
    try {
        const skills = await Skill.find();
        res.json(skills);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single skill
router.get('/:id', async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) return res.status(404).json({ message: 'Skill not found' });
        res.json(skill);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new skill
router.post('/', async (req, res) => {
    console.log('Received request to create skill:', req.body); // Log the request body
    const skill = new Skill({
        name: req.body.name,
        category: req.body.category,
        icon: req.body.icon
    });
    try {
        const newSkill = await skill.save();
        console.log("Skill successfully saved to database:", newSkill);
        res.status(201).json(newSkill);
    } catch (err) {
        console.error("Error creating skill:", err);
        if (err.code === 11000) {
            res.status(400).json({ message: 'Skill with that name already exists.' });
        } else {
            res.status(400).json({ message: err.message });
        }
    }
});

// Update a skill
router.patch('/:id', async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) return res.status(404).json({ message: 'Skill not found' });

        if (req.body.name != null) skill.name = req.body.name;
        if (req.body.category != null) skill.category = req.body.category;
        
        if (req.body.icon != null) skill.icon = req.body.icon;

        const updatedSkill = await skill.save();
        res.json(updatedSkill);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a skill
router.delete('/:id', async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) return res.status(404).json({ message: 'Skill not found' });

        await Skill.deleteOne({ _id: req.params.id });
        res.json({ message: 'Skill deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
