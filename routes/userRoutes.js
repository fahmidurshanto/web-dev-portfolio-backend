const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Note: For a real application, user routes would include authentication (login, register) and authorization.
// These are basic CRUD operations for demonstration purposes.

// Get all users (Admin only - for a real app)
router.get('/', async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password from response
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new user (e.g., registration - for a real app, password would be hashed)
router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password, // In a real app, hash this password!
        role: req.body.role || 'user'
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a user's profile (e.g., from ProfileSettings)
router.patch('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (req.body.username != null) user.username = req.body.username;
        if (req.body.email != null) user.email = req.body.email;
        if (req.body.password != null) user.password = req.body.password; // Hash in real app
        if (req.body.role != null) user.role = req.body.role;
        if (req.body.fullName != null) user.fullName = req.body.fullName;
        if (req.body.bio != null) user.bio = req.body.bio;
        if (req.body.profilePicture != null) user.profilePicture = req.body.profilePicture;
        if (req.body.socialLinks != null) user.socialLinks = req.body.socialLinks;

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await User.deleteOne({ _id: req.params.id });
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
