const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      owner: req.user._id,
      reminder: req.body.reminder || { enabled: false }
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.setReminder = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.taskId, owner: req.user._id },
      { 
        reminder: {
          enabled: true,
          triggerAt: new Date(req.body.reminderTime)
        }
      },
      { new: true }
    );
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};