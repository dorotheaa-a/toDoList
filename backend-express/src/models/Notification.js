const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    notificationType: { type: String, required: true },
    notificationTime: { type: Date, default: Date.now, required: true },
    notificationSent: { type: Boolean, default: false },
}, {timestamps: true});

module.exports = mongoose.model('Notification', notificationSchema);
