const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middlewares/auth');

router.post('/', auth, taskController.createTask);
router.get('/', auth, taskController.getTasks);
router.get('/:taskId', auth, taskController.getTaskById);
router.put('/:taskId', auth, taskController.updateTask);
router.delete('/:taskId', auth, taskController.deleteTask);
router.post('/:taskId/reminder', auth, taskController.setReminder);

module.exports = router;