const Project = require('../models/Project');
const Reminder = require('../models/Reminder');
const Note = require('../models/Note');

// create project
exports.createProject = async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      owner: req.user._id,
      collaborators: [req.user._id]
    });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ collaborators: req.user._id })
      .populate('reminders')
      .populate('notes')
      .populate('collaborators', 'userName userEmail');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProjectDetail = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      collaborators: req.user._id
    }).populate('reminders').populate('notes').populate('collaborators', 'userName userEmail');
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true }
    );
    if (!project) return res.status(404).json({ error: 'Project not found or unauthorized' });
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Collaborators
exports.addCollaborator = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project || !project.owner.equals(req.user._id)) {
      return res.status(403).json({ error: 'Only owner can add collaborators' });
    }

    const { userId } = req.body;
    if (!project.collaborators.includes(userId)) {
      project.collaborators.push(userId);
      await project.save();
    }

    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.removeCollaborator = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project || !project.owner.equals(req.user._id)) {
      return res.status(403).json({ error: 'Only owner can remove collaborators' });
    }

    project.collaborators.pull(req.params.userId);
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Reminders
exports.addReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.body.reminderId);
    const project = await Project.findOne({ _id: req.params.id, collaborators: req.user._id });

    if (!reminder || !project) return res.status(404).json({ error: 'Not found' });

    if (!project.reminders.includes(reminder._id)) {
      project.reminders.push(reminder._id);
      reminder.project = project._id;
      await Promise.all([project.save(), reminder.save()]);
    }

    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.removeReminder = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, collaborators: req.user._id });
    if (!project) return res.status(404).json({ error: 'Project not found' });

    project.reminders.pull(req.params.reminderId);
    await project.save();
    await Reminder.findByIdAndUpdate(req.params.reminderId, { $unset: { project: "" } });

    res.json({ message: 'Reminder removed from project' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Notes
exports.addNote = async (req, res) => {
  try {
    const note = await Note.findById(req.body.noteId);
    const project = await Project.findOne({ _id: req.params.id, collaborators: req.user._id });

    if (!note || !project) return res.status(404).json({ error: 'Not found' });

    if (!project.notes.includes(note._id)) {
      project.notes.push(note._id);
      note.project = project._id;
      await Promise.all([project.save(), note.save()]);
    }

    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.removeNote = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, collaborators: req.user._id });
    if (!project) return res.status(404).json({ error: 'Project not found' });

    project.notes.pull(req.params.noteId);
    await project.save();
    await Note.findByIdAndUpdate(req.params.noteId, { $unset: { project: "" } });

    res.json({ message: 'Note removed from project' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
