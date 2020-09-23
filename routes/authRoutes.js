const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/signup', authController.signupGet);
router.post('/signup', authController.signupPost);
router.get('/login', authController.loginGet);
router.post('/login', authController.loginPost);
 
module.exports = router;