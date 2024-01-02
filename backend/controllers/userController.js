const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// @desc    Get all users
// @route   GET /api/users
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// @desc    Register a user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body; // Destructuring the req.body object
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill in all fields');
  }
  // check if user exists
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Login a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; // Destructuring the req.body object
  const user = await User.findOne({ email: email }); // Find the user by email

  if (user && (await bcrypt.compare(password, user.password))) {
    // If the user exists and the password matches
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400); // Set the status to 400
    throw new Error('Invalid credentials'); // Throw an error
  }
});

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id); // Find the user by id
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  await User.findByIdAndDelete(req.params.id); // Delete the user
  res.status(200).json({ message: 'User removed' });
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const { name, email, password, newPassword } = req.body;
  const user = await User.findById(id);
  let updatedUser;
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  if (!password.length > 0) {
    res.status(400);
    throw new Error('Password not provided');
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    if (newPassword.length > 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      updatedUser = await User.updateOne(
        { _id: id },
        {
          $set: { name: name, email: email, password: hashedPassword },
          $currentDate: { lastModified: true },
        }
      ).exec();
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        token: updatedUser(user._id),
      });
    } else {
      updatedUser = await User.updateOne(
        { _id: user },
        { $set: { name: name, email: email }, $currentDate: { lastModified: true } }
      ).exec();
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        token: generateToken(updatedUser._id),
      });
    }
  }
  if (user && !(await bcrypt.compare(password, user.password))) {
    res.status(400).json({ message: 'Password is incorrect' });
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const { _id, email, name } = await User.findById(req.user.id); // Find the user by id

  res.status(200).json({
    _id: _id,
    name,
    email,
  });
});

// Generate a token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  getMe,
  generateToken,
  deleteUser,
  updateUser,
};
