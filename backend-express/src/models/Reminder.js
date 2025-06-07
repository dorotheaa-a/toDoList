const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  dueDate: Date,
  isCompleted: {
    type: Boolean,
    default: false,
  },
  reminder: {
    enabled: {
      type: Boolean,
      default: false,
    },
    triggerAt: Date,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    default: null, 
  },
}, { timestamps: true });

module.exports = mongoose.model('Reminder', reminderSchema);
