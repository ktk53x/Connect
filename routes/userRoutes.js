const express = require('express');
const userController = require('../controllers/userController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', userController.homeGet);
router.get('/profile', requireAuth, userController.profileGet);
router.post('/profile', requireAuth, userController.profilePost);
 
module.exports = router;