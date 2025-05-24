const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { logger } = require('../utils/logger');

exports.signup = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    
    const token = generateAuthToken(user);
    res.status(201).json({ user, token });
  } catch (error) {
    logger.error(`Signup error: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid credentials');
    }

    const token = generateAuthToken(user);
    res.json({ user, token });
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    res.status(401).json({ error: 'Authentication failed' });
  }
};

exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      tokenObj => tokenObj.token !== req.token
    );
    await req.user.save();
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    logger.error(`Logout error: ${error.message}`);
    res.status(500).json({ error: 'Logout failed' });
  }
};

const generateAuthToken = (user) => {
  return jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};