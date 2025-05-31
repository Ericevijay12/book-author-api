const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  githubId: { type: String, unique: true, sparse: true },  // optional and unique if present
  googleId: { type: String, unique: true, sparse: true },  // optional and unique if present
  username: { type: String, required: true },              // email or username
  displayName: String,
  profileUrl: String,       // for GitHub profile URL
  profilePhoto: String,     // for Google profile photo URL or GitHub avatar URL if desired
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
