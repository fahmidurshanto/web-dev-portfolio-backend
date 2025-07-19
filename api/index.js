require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Import Routes
const projectRoutes = require('../routes/projectRoutes');
const skillRoutes = require('../routes/skillRoutes');
const certificationRoutes = require('../routes/certificationRoutes');
const educationRoutes = require('../routes/educationRoutes');
const messageRoutes = require('../routes/messageRoutes');
const userRoutes = require('../routes/userRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use Routes
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('Welcome to the Portfolio Backend API!');
});

module.exports = app;
