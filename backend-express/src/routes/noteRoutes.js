const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const auth = require('../middlewares/auth');

// note route
router.use(auth);

router.post('/', noteController.createNote);
router.get('/', noteController.getUserNotes);
router.get('/:id', noteController.getNoteById);
router.patch('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);
router.post('/:noteId/project/:projectId', noteController.linkNoteToProject);

//collaborator routes
router.post('/:id/collaborators', noteController.addCollaborator);
router.delete('/:id/collaborators/:userId', noteController.removeCollaborator);

module.exports = router;
