const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');
const _ = require('lodash');

//REGISTER USER
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //Check If User Filled All Inputs
    if (!username || !email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'Please enter all details' });
    }

    //User Already Exists
    const emailAlreadyExists = await User.findOne({ email });

    if (emailAlreadyExists) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'Email already exists' });
    }

    const usernameAlreadyExists = await User.findOne({ username });

    if (usernameAlreadyExists) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'Username already exists' });
    }

    //Hash User Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create New User
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    //Save User
    await newUser.save();
    res
      .status(StatusCodes.CREATED)
      .json({ msg: 'Account created successfully' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};

//LOGIN USER
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Check If User Filled All Inputs
    if (!email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'Please enter email and password' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: 'Incorrect password' });
    }

    res.status(StatusCodes.OK).json({
      user: _.omit(user.toObject(), ['password']), // omit the password field
      msg: `Welcome back ${user.username}`,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

module.exports = { register, login };
