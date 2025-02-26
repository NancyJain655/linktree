const express = require('express');
const {registerUser, loginUser, updateUser, deleteUser, logoutUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);

 router.put('/update', authMiddleware, updateUser);                 
// router.delete('/delete', authMiddleware, deleteUser);
// router.post('/logout', authMiddleware, logoutUser);

module.exports = router;
