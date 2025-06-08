const Note = require('../models/Note');

exports.createNote = async (req, res) => {
  try {
    const note = new Note({
      ...req.body,
      owner: req.user._id
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get user notes
exports.getUserNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      $or: [
        { owner: req.user._id },
        { collaborators: req.user._id }
      ]
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      $or: [
        { owner: req.user._id },
        { collaborators: req.user._id }
      ]
    });
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    if (!note) return res.status(404).json({ error: 'Note not found or unauthorized' });
    res.json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!note) return res.status(404).json({ error: 'Note not found or unauthorized' });
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.linkNoteToProject = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.noteId, owner: req.user._id },
      { project: req.params.projectId },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addCollaborator = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, owner: req.user._id });
    if (!note) return res.status(404).json({ error: 'Note not found' });

    const { userId } = req.body;
    if (!note.collaborators.includes(userId)) {
      note.collaborators.push(userId);
      await note.save();
    }

    res.json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.removeCollaborator = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, owner: req.user._id });
    if (!note) return res.status(404).json({ error: 'Note not found' });

    note.collaborators.pull(req.params.userId);
    await note.save();

    res.json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
