const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
    trim: true
  },
  dateOfBirth: {
    type: Date
  },
  nationality: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Author', authorSchema);
