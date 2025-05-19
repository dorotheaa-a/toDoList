const Note = require ('../models/Note');

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