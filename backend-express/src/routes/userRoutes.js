const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userController = require('../controllers/userController');

router.post('/change-password', auth, userController.changePassword);

module.exports = router;