const Link = require("../models/Link");

// @desc Get all links for logged-in user
// @route GET /api/links
// @access Private
const getLinks = async (req, res) => {
    try {
        const links = await Link.find({ user: req.user.id });
        return res.json(links);
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc Create a new link
// @route POST /api/links
// @access Private
const createLink = async (req, res) => {
    try {
        const { type, title, url } = req.body;


        if (!type || !title || !url) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newLink = new Link({ user: req.user.id, type, title, url });
        await newLink.save();

        return res.status(201).json(newLink);
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc Update a link
// @route PUT /api/links/:id
// @access Private
const updateLink = async (req, res) => {
    try {
        const { type, title, url } = req.body;
        const link = await Link.findById(req.params.id);

        if (!link) {
            return res.status(404).json({ message: "Link not found" });
        }

        if (link.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        link.type = type || link.type;
        link.title = title || link.title;
        link.url = url || link.url;
        await link.save();

        return res.json(link);
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
// @desc Delete a link
// @route DELETE /api/links/:id
// @access Private
const deleteLink = async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        console.log(link);

        if (!link) {
            return res.status(404).json({ message: "Link not found" });
        }

        if (link.user.toString() !== req.user.id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await Link.findByIdAndDelete(req.params.id);
        return res.json({ message: "Link deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { getLinks, createLink, updateLink, deleteLink };



// export const getAnalyticsData = async (req, res) => {
//     try {
//         const { userId } = req.params;

//         const links = await Link.find({ userId });

//         if (!links.length) {
//             return res.status(404).json({ message: "No links found for this user" });
//         }

//         let deviceStats = {};
//         let monthlyStats = {};
//         let linkViews = {};

//         links.forEach((link) => {
//             linkViews[link.title] = link.analytics.length;

//             link.analytics.forEach((entry) => {
//                 deviceStats[entry.device] = (deviceStats[entry.device] || 0) + 1;

//                 const month = new Date(entry.timestamp).toISOString().slice(0, 7);
//                 monthlyStats[month] = (monthlyStats[month] || 0) + 1;
//             });
//         });

//         res.status(200).json({
//             viewsByDevice: deviceStats,
//             viewsByMonth: monthlyStats,
//             viewsOnLinks: linkViews,
//         });
//     } catch (error) {
//         console.error("Error fetching analytics:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };