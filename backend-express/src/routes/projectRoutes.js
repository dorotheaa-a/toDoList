const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const controller = require('../controllers/projectController');

router.use(auth);

// Main project routes
router.post('/', controller.createProject);
router.get('/', controller.getAllProjects);
router.get('/:id', controller.getProjectDetail);
router.put('/:id', controller.updateProject);
router.delete('/:id', controller.deleteProject);

// Collaborator routes
router.post('/:id/collaborators', controller.addCollaborator);
router.delete('/:id/collaborators/:userId', controller.removeCollaborator);

// Reminder (task) management
router.post('/:id/reminders', controller.addReminder);
router.delete('/:id/reminders/:reminderId', controller.removeReminder);

// Note management
router.post('/:id/notes', controller.addNote);
router.delete('/:id/notes/:noteId', controller.removeNote);

module.exports = router;
