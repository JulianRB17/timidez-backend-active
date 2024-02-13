const mongoose = require('mongoose');
const validator = require('validator');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: (value) => `${value} no es un email válido`,
    },
    required: true,
  },
  webinarDate: {
    type: Date,
    required: true,
    default: new Date(process.env.WEBINAR_DATE),
  },
  creationDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model('User', userSchema);
