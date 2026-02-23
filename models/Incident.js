const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  tourist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  location: String,
  status: {
    type: String,
    enum: ['active', 'resolved', 'pending'],
    default: 'pending'
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Incident', incidentSchema);