const express = require("express");
const { trackLinkClick, getAnalytics } = require("../controllers/analyticsController");
const  authMiddleware  = require("../middleware/auth");

const router = express.Router();

router.get("/:linkId", trackLinkClick); // Public click tracking
router.get("/", authMiddleware, getAnalytics); // Private analytics data for users

module.exports = router;