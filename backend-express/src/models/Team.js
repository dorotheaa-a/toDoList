const mongoose = require('mongoose');

// teams
const teamMemberSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isLeader: { type: Boolean, default: false },
});

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [teamMemberSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);
