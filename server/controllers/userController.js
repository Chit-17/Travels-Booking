const User = require('../models/User');
const FleetOwner = require('../models/FleetOwner');
const Admin = require('../models/Admin');
const generateToken = require('../utils/generateToken');

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password, role, ...otherDetails } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  let user;

  if (role === 'fleet_owner') {
    user = await FleetOwner.create({
      name,
      email,
      password,
      role,
      ...otherDetails
    });
  } else if (role === 'admin') {
     // Usually admins are created manually or via a special route, but for dev:
    user = await Admin.create({
        name,
        email,
        password,
        role,
        ...otherDetails
    });
  } else {
    user = await User.create({
      name,
      email,
      password,
      role: 'user', // Force role to user if not specified or invalid (unless we allow 'user' explicitly)
      ...otherDetails
    });
  }

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      // Add other fields if needed
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
};
