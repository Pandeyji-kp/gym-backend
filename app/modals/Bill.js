const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  paid: { type: Boolean, default: false },
  dueDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Bill', billSchema);