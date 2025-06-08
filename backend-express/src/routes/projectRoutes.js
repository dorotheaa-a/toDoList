const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const controller = require('../controllers/projectController');

// project route
router.use(auth);

//project routes
router.post('/', controller.createProject);
router.get('/', controller.getAllProjects);
router.get('/:id', controller.getProjectDetail);
router.put('/:id', controller.updateProject);
router.delete('/:id', controller.deleteProject);

//collaborator routes
router.post('/:id/collaborators', controller.addCollaborator);
router.delete('/:id/collaborators/:userId', controller.removeCollaborator);

//reminder (task) management
router.post('/:id/reminders', controller.addReminder);
router.delete('/:id/reminders/:reminderId', controller.removeReminder);

//note management
router.post('/:id/notes', controller.addNote);
router.delete('/:id/notes/:noteId', controller.removeNote);

module.exports = router;
