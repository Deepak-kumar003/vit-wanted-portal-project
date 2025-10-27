const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Item = require('../models/itemModel');
const Offer = require('../models/offerModel');

// @desc   Register a new user
// @route  POST /api/users/register
// @access Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // 1. Validation
  if (!name || !email || !password) {
    res.status(400).json({ message: 'Please include all fields' });
    return;
  }

  // 2. Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  // 3. Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 4. Create the new user in the database
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // 5. If user created successfully, send back user data and a token
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// --- ADD THIS NEW FUNCTION ---
// @desc   Login a user
// @route  POST /api/users/login
// @access Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // 1. Check if user with that email exists
  const user = await User.findOne({ email });

  // 2. If user exists, compare the entered password with the hashed password in the DB
  if (user && (await bcrypt.compare(password, user.password))) {
    // 3. If they match, send back the user data and a new token
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    // If user doesn't exist or password doesn't match, send an error
    res.status(400).json({ message: 'Invalid credentials' });
  }
};

// @desc   Delete user & all their data
// @route  DELETE /api/users/:id
// @access Private
const deleteUser = async (req, res) => {
  try {
    // We get the user ID from the token, not the params, for security
    const userId = req.user.id; 

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 1. Delete all items posted by the user
    await Item.deleteMany({ user: userId });

    // 2. Delete all offers made by the user
    await Offer.deleteMany({ user: userId });

    // 3. Delete the user
    await user.deleteOne();

    res.status(200).json({ message: 'User, posts, and offers deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting user.', error: error.message });
  }
};

// Function to generate a JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser,
  deleteUser,
};