const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please enter your name'],
      min: [3, 'Please enter a username greater than 2 characters'],
      max: [20, 'Username should not exceed 20 characters'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      max: [50, 'Email address should not exceed 50 characters'],
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: 'Please provide valid email address',
      },
    },
    password: {
      type: String,
      required: [true, 'Please enter password'],
      min: [6, 'Password should not be less than 8 characters'],
    },
    profilePicture: {
      type: String,
      default: '',
    },
    coverPicture: {
      type: String,
      default: '',
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 50,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
