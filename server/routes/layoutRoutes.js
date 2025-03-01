const express = require("express");

const authMiddleware = require("../middleware/auth");
const { updateLayout ,getLayout} = require("../controllers/layoutController");

const router = express.Router();

router.put("/appearance", authMiddleware,updateLayout);
router.get("/appearance", authMiddleware,getLayout); 

module.exports = router;