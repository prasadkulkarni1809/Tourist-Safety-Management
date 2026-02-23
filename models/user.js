const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['tourist', 'authority', 'police'],
    default: 'tourist'
  }
});

module.exports = mongoose.model('User', userSchema);