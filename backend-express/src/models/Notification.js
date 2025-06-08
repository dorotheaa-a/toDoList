const mongoose = require('mongoose');

// notif model
const notificationSchema = new mongoose.Schema({
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Reminder', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  notificationTime: { type: Date, required: true },
  notificationType: { type: String, enum: ['email', 'popup', 'sms'], default: 'popup' },
  notificationSent: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
