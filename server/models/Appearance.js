const mongoose = require("mongoose");

const AppearanceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true // Index for faster queries
    },
    layout: {
        type: String,
        enum: ['stack', 'grid', 'carousel'],
        default: 'stack'
    },
    buttons: {
        type: {
            type: String,
            enum: ['fill', 'outline', 'soft-shadow', 'hard-shadow'],
            required: true,
            default: 'fill'
        },
        style: {
            type: String,
            enum: ['0', '1', '2'],
            required: true,
            default: '0'
        },
        buttonColor: { type: String, default: '#000000' },
        buttonTextColor: { type: String, default: '#ffffff' }
    },
    fontFamily: { 
        type: String, 
        default: 'DM Sans'
    },
    theme: {
        type: String,
        enum: ['air-snow', 'mineral-Orange','air-Blue','air-Smoke','air-Black','mineral-Grey','mineral-black'],
        default: 'air-snow'
    },
}, { timestamps: true });

const Appearance = mongoose.model("Appearance", AppearanceSchema);
module.exports = Appearance;
