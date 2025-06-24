// modals/diet.js
const mongoose = require('mongoose');

const dietSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: () => new Date().setHours(0, 0, 0, 0),
  },
  title: String, // ✅ to support title display in UI
  description: String, // ✅ to support message in UI
  meal1: String,
  meal2: String,
  meal3: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Admin
  },
}, { timestamps: true });

module.exports = mongoose.model('Diet', dietSchema);
