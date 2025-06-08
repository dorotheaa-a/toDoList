const Reminder = require('../models/Reminder');

// Create a new reminder
exports.createReminder = async (req, res) => {
  try {
    const reminder = new Reminder({
      ...req.body,
      owner: req.user._id,
    });
    await reminder.save();
    res.status(201).json(reminder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Set or update reminder
exports.setReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndUpdate(
      { _id: req.params.reminderId, owner: req.user._id },
      {
        reminder: {
          enabled: true,
          triggerAt: new Date(req.body.reminderTime),
        },
      },
      { new: true }
    );
    res.json(reminder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all reminders for user
exports.getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ owner: req.user._id });
    res.json(reminders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get reminder by ID
exports.getReminderById = async (req, res) => {
  try {
    const reminder = await Reminder.findOne({ _id: req.params.reminderId, owner: req.user._id });
    if (!reminder) return res.status(404).json({ message: 'Reminder not found' });
    res.json(reminder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a reminder
exports.updateReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndUpdate(
      { _id: req.params.reminderId, owner: req.user._id },
      req.body,
      { new: true }
    );
    if (!reminder) return res.status(404).json({ message: 'Reminder not found' });
    res.json(reminder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a reminder
exports.deleteReminder = async (req, res) => {
  try {
    const result = await Reminder.deleteOne({ _id: req.params.reminderId, owner: req.user._id });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Reminder not found' });
    res.json({ message: 'Reminder deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mark reminder as completed
exports.markAsCompleted = async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndUpdate(
      { _id: req.params.reminderId, owner: req.user._id },
      { isCompleted: true },
      { new: true }
    );
    if (!reminder) return res.status(404).json({ message: 'Reminder not found' });
    res.json(reminder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
