// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();  // <= must be at top

const server = express();

// Middlewares
server.use(express.json());
server.use(bodyParser.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require('./app/routes/website/authRoutes');
const billRoutes = require('./app/routes/website/billRoutes');
const userRoutes = require('./app/routes/website/userRoutes');
const adminRoutes = require('./app/routes/website/adminRoutes');
const notificationRoutes = require('./app/routes/website/notificationRoutes');
const dietRoutes = require('./app/routes/website/dietRotes')
server.use('/api/diets', dietRoutes)
server.use('/api/notifications', notificationRoutes);
server.use('/api/admin', adminRoutes)
server.use('/api/users', userRoutes)
server.use('/api/auth', authRoutes);
server.use('/api/bills', billRoutes);

// Health check
server.get('/', (req, res) => {
  res.send('🏋️ GYM Management API is Running');
});

// 404 catch-all
server.get('*', (req, res) => {
  res.status(404).send('404 Page not found !!');
});

// Read from .env
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gym_member';

console.log('Connecting to MongoDB at', MONGO_URI);
console.log('Server will listen on port', PORT);

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ DB connected');
    server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ DB connection error:', err);
    process.exit(1);
  });
