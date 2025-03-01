const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        type: {
            type: String,
            enum: ["link", "shop"],
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        clicks: {
            type: Number,
            default: 0,
        },
        
    },
    { timestamps: true }
);

const Link = mongoose.model("Link", LinkSchema);
module.exports = Link;