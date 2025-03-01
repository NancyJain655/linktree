const User = require("../models/User");

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
const updateProfile = async (req, res) => {
  try {
      const user = await User.findById(req.user.id);
     
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
       let updatedData = {};
       updatedData.Bio=req.body.Bio;
        updatedData.backColor=req.body.backColor;
    
     const updatedUser = await User.findByIdAndUpdate(req.user.id, updatedData, {
           new: true, // Returns updated document
           runValidators: true, // Ensures all validation rules are checked
         });
  
         res.status(200).json({
          message: "User information updated successfully",
          data: updatedUser,
        });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
   

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
     if(!req.body.username || !req.body.category){
      return res.status(400).json({ msg: 'username and category are required' });
     }
     let updatedData = {};
     updatedData.username=req.body.username;
      updatedData.category=req.body.category;
  
   const updatedUser = await User.findByIdAndUpdate(req.user.id, updatedData, {
         new: true, // Returns updated document
         runValidators: true, // Ensures all validation rules are checked
       });

       res.status(200).json({
        message: "User information updated successfully",
        data: updatedUser,
      });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getUserProfile, updateUserProfile ,updateProfile};