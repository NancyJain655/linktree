const express = require("express");
const { getLinks, createLink, updateLink, deleteLink } = require("../controllers/linkController");
const  authMiddleware = require("../middleware/auth");

const router = express.Router();

router
    .route("/")
    .get(authMiddleware, getLinks)
    .post(authMiddleware, createLink);


router
    .route("/:id")
    .put(authMiddleware, updateLink)
    .delete(authMiddleware, deleteLink);

module.exports = router;





// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../middleware/auth.middleware");
// const Link = require("../models/link.model");
// const User = require("../models/user.model");
// const dotenv = require("dotenv");
// const trackAnalytics = require("../middlewares/trackAnalytics");

// dotenv.config();
// router.use(express.json());


// router.get("/:linkId", Analytics ,async (req, res) => {
//     try {
//         const link = await Link.findById(req.params.linkId);

//         if (!link) {
//             return res.status(404).json({ message: "Link not found" });
//         }
//         res.redirect(link.url)     
//     } catch (error) {
//         console.error("Error fetching link:", error);
//         res.status(500).json({ message: "An error occurred" });
//     }
// })


// module.exports = router;