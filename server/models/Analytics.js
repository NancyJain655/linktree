const mongoose = require("mongoose");

const AnalyticsSchema = new mongoose.Schema(
    {
        link: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Link",
            required: true,
        },
        ip: {
            type: String,
            required: true,
        },
        device: {
            type: String,
            required: true,
        },
        referrer: {
            type: String,
            default: "direct",
        },
    },
    { timestamps: true }
);

const Analytics = mongoose.model("Analytics", AnalyticsSchema);
module.exports = Analytics;