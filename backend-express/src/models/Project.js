const mongoose = require('mongoose');

// project model
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  reminders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reminder' }],
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started'
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
