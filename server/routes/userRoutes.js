const express = require("express");
const { getUserProfile, updateUserProfile,updateProfile } = require("../controllers/userController");
const  authMiddleware  = require("../middleware/auth");

const router = express.Router();

// Protected Routes

router.get("/profile",authMiddleware, getUserProfile);
router.put("/profile",authMiddleware, updateUserProfile);
router.put("/profile1",authMiddleware, updateProfile);

module.exports = router;