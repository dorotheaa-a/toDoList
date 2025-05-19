const User = require('../models/User');
const { generateAuthToken, loginUser } = require('../services/authService');

exports.signup = async (req, res) => {
  try {
    const user = new User (req.body);
    await user.save();
    const token = await generateAuthToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    const token = await loginUser(userEmail, userPassword);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = req.user;

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    user.userPassword = newPassword;
    await user.save();
    res.send({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};