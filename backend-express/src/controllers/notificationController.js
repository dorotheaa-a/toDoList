const Notification = require('../models/Notification');
// testing
// Create a new notification for a reminder/task
exports.createNotification = async (req, res) => {
  try {
    const { taskId, notificationTime, notificationType } = req.body;

    const notif = new Notification({
      task: taskId,
      user: req.user._id,
      notificationTime,
      notificationType,
    });

    await notif.save();
    res.status(201).json(notif);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all notifications for the logged-in user
exports.getUserNotifications = async (req, res) => {
  try {
    const notifs = await Notification.find({ user: req.user._id })
      .populate('task'); // optionally show task info
    res.json(notifs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark a notification as sent (or handled)
exports.markAsSent = async (req, res) => {
  try {
    const notif = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { notificationSent: true },
      { new: true }
    );
    if (!notif) return res.status(404).json({ error: 'Notification not found' });
    res.json(notif);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
  try {
    const notif = await Notification.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!notif) return res.status(404).json({ error: 'Notification not found' });
    res.json({ message: 'Notification deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
