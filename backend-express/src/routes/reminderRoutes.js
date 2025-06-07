const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminderController');
const auth = require('../middlewares/auth');

router.use(auth);

router.post('/', reminderController.createReminder);
router.get('/', reminderController.getReminders);
router.get('/:reminderId', reminderController.getReminderById);
router.put('/:reminderId', reminderController.updateReminder);
router.delete('/:reminderId', reminderController.deleteReminder);
router.post('/:reminderId/reminder', reminderController.setReminder);
router.patch('/:reminderId/complete', reminderController.markAsCompleted);

module.exports = router;
