
const mongoose = require("mongoose");
const Appearance = require("../models/Appearance");
const User = require("../models/User");

const getApppearance =  async (req, res) => {
    try {
        console.log(req.user.id);
        let  userId  = req.user.id;
        userId = new mongoose.Types.ObjectId(userId);
        if (!userId) {
            return res.status(400).json({ message: "Please Login first" });
        }
        const appearance = await Appearance.findOne({ userId }); 
        if (!appearance) {
            return res.status(404).json({ message: "Appearance settings not found" });
        }

        res.status(200).json(appearance);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


const createAppearance = async (req, res) => {
    try {
        let userId  = req.user.id;
        userId = new mongoose.Types.ObjectId(userId);
        console.log(req.user.id);
        console.log(userId);
        console.log(req.body);
        const {  layout, buttons, fontFamily, theme } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "Please Login first" });
        }

        const existingAppearance = await Appearance.findOne({userId});
        console.log(existingAppearance);
        if (existingAppearance) {
            return res.status(400).json({ message: "Appearance settings already exist for this user" });
        }

        const appearance = new Appearance({ userId, layout, buttons, fontFamily, theme });
        await appearance.save();
        res.status(201).json(appearance);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


const updateAppearance = async (req, res) => {
    try {
        const { userId } = req.params;
        const updates = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const appearance = await Appearance.findOneAndUpdate({ userId }, updates, { new: true });
        if (!appearance) {
            return res.status(404).json({ message: "Appearance settings not found" });
        }

        res.status(200).json(appearance);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


module.exports = {getApppearance ,createAppearance , updateAppearance}