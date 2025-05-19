const express = require('express');
const router = express.Router();
const noteController = require('../controllers/notesController');
const auth = require('../middlewares/auth');

router.post('/', auth, noteController.createNote);
router.patch('/:id', auth, noteController.linkNoteToProject);
router.get('/', noteController.getNotes);
router.get('/:id', noteController.getNoteById);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;
