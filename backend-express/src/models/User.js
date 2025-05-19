const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { use } = require('react');

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  userEmail: { type: String, required: true, unique: true },
  userPassword: { type: String, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
  if (!this.isModified('userPassword')) return next();
  this.userPassword = await bcrypt.hash(this.userPassword, 10);
  next();
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.userPassword);
};

module.exports = mongoose.model('User', UserSchema);
