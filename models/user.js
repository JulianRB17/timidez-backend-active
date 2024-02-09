const mongoose = require('mongoose');
const validator = require('validator');
const catchAsync = require('../utils/catchAsync');

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
  webinar: {
    type: Date,
    required: true,
    default: new Date(process.env.WEBINAR_DATE),
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', userSchema);
