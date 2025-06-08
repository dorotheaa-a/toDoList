const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const notificationController = require('../controllers/notificationController');

// notif route
router.use(auth);

router.post('/', notificationController.createNotification);
router.get('/', notificationController.getUserNotifications);
router.patch('/:id/mark-sent', notificationController.markAsSent);
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;
