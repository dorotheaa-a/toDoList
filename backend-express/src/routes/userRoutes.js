const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.get('/me', auth, userController.getProfile);
router.patch('/me', auth, userController.updateProfile);
router.post('/change-password', auth, userController.changePassword);

router.post('/forgot-password', userController.forgotPassword);
router.put('/reset-password', userController.resetPassword);

module.exports = router;
