const Analytics = require("../models/Analytics");
const Link = require("../models/Link");
const uaParser = require("ua-parser-js");

// @desc Track link click
// @route GET /api/analytics/:linkId
// @access Public
const trackLinkClick = async (req, res) => {
    try {
        const { linkId } = req.params;
        console.log("Received linkId:", linkId);
        const userAgent = req.headers["user-agent"];
        let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
        const referrer = req.headers["referer"] || "direct";
        if(ip === "::1"){
            ip = "127.0.0.1";
        }
console.log("User-Agent:", userAgent);
        console.log("ip", ip);
        console.log("referer", referrer);
        const deviceInfo = uaParser(userAgent);
console.log(deviceInfo);
        const device = deviceInfo.os.name || "unknown";
        console.log(device);

        // Check if this IP has already visited this link
        const existingView = await Analytics.findOne({ link: linkId, ip });
        console.log(existingView);
        const link = await Link.findById(linkId)
        console.log(link);

        if (!existingView) {
           const newAnalytics=  new Analytics({ link: linkId, ip, device, referrer });
           await newAnalytics.save();
        }

        // Increment Click Count
        await Link.findByIdAndUpdate(linkId, { $inc: { clicks: 1 } });

        return res.status(200).json({url:link.url}); // Redirect user to the actual link
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};



const getAnalytics = async (req, res) => {
    try {
        const links = await Link.find({ user: req.user.id }).select("_id title type");

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
                            _id: { year: { $year: "$timestamp" }, month: { $month: "$timestamp" } },
                            count: { $sum: 1 },
                        },
                    },
                    { $sort: { "_id.year": 1, "_id.month": 1 } },
                ]);
                const monthNames = [
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                  ];

                // Device Type Breakdown
                const deviceStats = await Analytics.aggregate([
                    { $match: { link: link._id } },
                    { $group: { _id: "$device", count: { $sum: 1 } } },
                ]);
               console.log(link.type);
                return {
                    linkId: link._id,
                    type: link.type,
                    title: link.title,
                    totalClicks,
                    uniqueViews,
                    viewsPerMonth: viewsPerMonth.map((v) => ({
                        month:  monthNames[v._id.month - 1],
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


module.exports = { trackLinkClick, getAnalytics, };