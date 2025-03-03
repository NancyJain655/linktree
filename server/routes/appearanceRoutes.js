const express = require("express");
const Appearance = require("../models/Appearance");
const router = express.Router();
const mongoose = require("mongoose");
const { getApppearance, createAppearance, updateAppearance } = require("../controllers/appearanceController");
const  protect  = require("../middleware/auth");

router.get("/:userId", protect, getApppearance )

router.post("/",protect, createAppearance);

router.put("/:userId", protect ,updateAppearance );

module.exports = router;
