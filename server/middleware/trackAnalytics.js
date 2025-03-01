const Link = require("../models/Link");
const geoip = require("geoip-lite");

const trackAnalytics = async (req, res, next) => {
    try {
        const { linkId } = req.params;
        const link = await Link.findById(linkId);
        if (!link) return res.status(404).json({ message: "Link not found" });

        const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
        const geo = geoip.lookup(ip) || {};
        const location = geo.city ? `${geo.city}, ${geo.country}` : "Unknown";
        const referrer = req.get("Referer") || "Direct";
        const userAgent = req.get("User-Agent") || "";
        const device = /mobile/i.test(userAgent)
            ? "Mobile"
            : /tablet/i.test(userAgent)
                ? "Tablet"
                : "Desktop";
        // Choose analytics type (link or shop)
        const analyticsType = link.type === "shop" ? "shops" : "links";

        // Prevent duplicate counts from the same IP within a short time
        const recentView = link.analytics[analyticsType].find(
            (entry) => entry.ip === ip && Date.now() - new Date(entry.timestamp) < 60000
        );

        if (!recentView) {
            link.analytics[analyticsType].push({ ip, device, location, referrer });
            link.clicks += 1;
            await link.save();
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error tracking analytics" });
    }
};

export const Analytics = async (req, res, next) => {
  try {
    const { linkId } = req.params;
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const userAgent = req.headers["user-agent"] || "Unknown";
    const referrer = req.headers.referer || "Direct";


    let device = "Unknown";
    if (/windows/i.test(userAgent)) device = "Windows";
    else if (/android/i.test(userAgent)) device = "Android";
    else if (/iphone|ipad/i.test(userAgent)) device = "iOS";
    else if (/mac/i.test(userAgent)) device = "MacOS";
    else if (/linux/i.test(userAgent)) device = "Linux";


    // Find the link
    const link = await Link.findById(linkId);
    if (!link) return res.status(404).json({ message: "Link not found" });

    // Check if the IP already exists (unique view)
    const existingView = link.analytics.find((entry) => entry.ip === ip);
    if (!existingView) {
      // Add a new unique view
      link.analytics.push({ ip, device });
    }

    // Increment click count
    link.clicks += 1;

    // Save updated link
    await link.save();
    next();
  } catch (error) {
    console.error("Analytics Middleware Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = trackAnalytics;