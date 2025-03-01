const Analytics = require("../models/Analytics");
const Link = require("../models/Link");
const uaParser = require("ua-parser-js");

// @desc Track link click
// @route GET /api/analytics/:linkId
// @access Public
const trackLinkClick = async (req, res) => {
    try {
        const { linkId } = req.params;
        const userAgent = req.headers["user-agent"];
        const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
        const referrer = req.headers["referer"] || "direct";

        const deviceInfo = uaParser(userAgent);
        const device = deviceInfo.os.name || "unknown";

        // Check if this IP has already visited this link
        const existingView = await Analytics.findOne({ link: linkId, ip });
        const link = await Link.findById(linkId)

        if (!existingView) {
            await new Analytics({ link: linkId, ip, device, referrer }).save();
        }

        // Increment Click Count
        await Link.findByIdAndUpdate(linkId, { $inc: { clicks: 1 } });

        return res.redirect(link.url); // Redirect user to the actual link
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};



const getAnalytics = async (req, res) => {
    try {
        const links = await Link.find({ user: req.user._id }).select("_id title");

        const analyticsData = await Promise.all(
            links.map(async (link) => {
                // Total Clicks on Link
                const totalClicks = await Analytics.countDocuments({ link: link._id });

                // Unique Views on Link
                const uniqueViews = (await Analytics.distinct("ip", { link: link._id })).length;

                // Views Per Month (Last 12 Months)
                const viewsPerMonth = await Analytics.aggregate([
                    { $match: { link: link._id } },
                    {
                        $group: {
                            _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
                            count: { $sum: 1 },
                        },
                    },
                    { $sort: { "_id.year": 1, "_id.month": 1 } },
                ]);

                // Device Type Breakdown
                const deviceStats = await Analytics.aggregate([
                    { $match: { link: link._id } },
                    { $group: { _id: "$device", count: { $sum: 1 } } },
                ]);

                return {
                    linkId: link._id,
                    title: link.title,
                    totalClicks,
                    uniqueViews,
                    viewsPerMonth: viewsPerMonth.map((v) => ({
                        month: v._id.month,
                        year: v._id.year,
                        count: v.count,
                    })),
                    deviceStats,
                };
            })
        );

        return res.json(analyticsData);
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


module.exports = { trackLinkClick, getAnalytics };