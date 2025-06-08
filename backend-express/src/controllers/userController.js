const User = require('../models/User');
const crypto = require('crypto');
// const { sendResetEmail } = require('../utils/email'); 

// grab prof
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-userPassword -tokens');
  res.json(user);
};

exports.updateProfile = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { userName: req.body.userName, userEmail: req.body.userEmail },
    { new: true, runValidators: true }
  );
  res.json(user);
};

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);

  if (!(await user.comparePassword(currentPassword))) {
    return res.status(400).json({ error: 'Current password is incorrect' });
  }

  user.userPassword = newPassword;
  await user.save();
  res.json({ message: 'Password changed successfully' });
};

exports.forgotPassword = async (req, res) => {
  const user = await User.findOne({ userEmail: req.body.userEmail });
  if (!user) return res.status(404).json({ error: 'Email not found' });

  const token = crypto.randomBytes(32).toString('hex');
  user.resetToken = token;
  user.resetTokenExpires = Date.now() + 3600000;
  await user.save();

  await sendResetEmail(user.userEmail, token); // mock this in dev
  res.json({ message: 'Password reset link sent' });
};

exports.resetPassword = async (req, res) => {
  const user = await User.findOne({
    resetToken: req.body.token,
    resetTokenExpires: { $gt: Date.now() }
  });

  if (!user) return res.status(400).json({ error: 'Invalid or expired token' });

  user.userPassword = req.body.newPassword;
  user.resetToken = undefined;
  user.resetTokenExpires = undefined;
  await user.save();

  res.json({ message: 'Password reset successful' });
};
