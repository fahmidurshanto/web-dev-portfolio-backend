const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Get all messages
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single message
router.get('/:id', async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) return res.status(404).json({ message: 'Message not found' });
        res.json(message);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new message (from contact form)
router.post('/', async (req, res) => {
    const message = new Message({
        senderName: req.body.senderName,
        senderEmail: req.body.senderEmail,
        subject: req.body.subject,
        message: req.body.message
    });
    try {
        const newMessage = await message.save();
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update message status (e.g., mark as read)
router.patch('/:id', async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) return res.status(404).json({ message: 'Message not found' });

        if (req.body.read != null) message.read = req.body.read;

        const updatedMessage = await message.save();
        res.json(updatedMessage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a message
router.delete('/:id', async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) return res.status(404).json({ message: 'Message not found' });

        await Message.deleteOne({ _id: req.params.id });
        res.json({ message: 'Message deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
