const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//user
const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  userEmail: { type: String, required: true, unique: true },
  userPassword: { type: String, required: true },
  resetToken: { type: String }, // for password reset
  resetTokenExpires: { type: Date },
  tokens: [{ token: { type: String, required: true } }]
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
  if (!this.isModified('userPassword')) return next();
  this.userPassword = await bcrypt.hash(this.userPassword, 10);
  next();
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.userPassword);
};

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  this.tokens.push({ token });
  return token;
};

module.exports = mongoose.model('User', UserSchema);
