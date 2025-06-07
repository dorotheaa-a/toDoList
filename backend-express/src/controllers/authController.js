const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { logger } = require('../utils/logger');
const { sendResetEmail } = require('../services/emailService');

exports.signup = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = generateAuthToken(user);

    const sanitizedUser = user.toObject();
    delete sanitizedUser.userPassword;

    res.status(201).json({ user: sanitizedUser, token });
  } catch (error) {
    logger.error(`Signup error: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ userEmail: email });

    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid credentials');
    }

    const token = generateAuthToken(user);
    const sanitizedUser = user.toObject();
    delete sanitizedUser.userPassword;

    res.json({ user: sanitizedUser, token });
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    res.status(401).json({ error: 'Authentication failed' });
  }
};

exports.logout = async (req, res) => {
  // Stateless: Token is discarded on client
  res.json({ message: 'Logged out successfully (stateless JWT)' });
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ userEmail: email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    await sendResetEmail(email, token);

    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    logger.error(`Forgot Password error: ${error.message}`);
    res.status(500).json({ error: 'Failed to send reset email' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(404).json({ error: 'User not found' });

    user.userPassword = newPassword;
    await user.save();

    res.json({ message: 'Password has been reset' });
  } catch (error) {
    logger.error(`Reset Password error: ${error.message}`);
    res.status(400).json({ error: 'Invalid or expired token' });
  }
};

const generateAuthToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};
