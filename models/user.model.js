const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  /* Name of the user */
  fullName: {
    type: String,
    required: true
  },
  /* Email of the user */
  email: {
    type: String,
    required: true,
    unique: true,
    // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
    match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
  },
  /* bcrypted password of the user */
  hashedPassword: {
    type: String,
    required: true
  },
  /* role of the user */
  role: {
    type: String,
    required: true
  },
  /* record created date */
  createdAt: {
    type: Date,
    default: Date.now
  },
  /* record updated date */
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('User', UserSchema);