const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
const registerUser = async (req, res) => {
  const { firstName,lastName, email, password, confirmPassword } = req.body;

  try {
    if (!firstName || !email || !password || !confirmPassword) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: 'Passwords do not match' });
    }

    let existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'Email is already registered' });


    const user = new User({ firstName,lastName, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload =  { id: user._id } ;
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      msg: 'Registered successfully',
      token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ msg: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'user is not registered please sign up' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload =  { id: user._id } ;
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({
      msg: 'logged in successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName:user.lastName,
        username:user.username,
        category:user.category,

      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
// 
const updateUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Find the current user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let updatedData = {};

    if (firstName) updatedData.firstName = firstName;
    if (lastName) updatedData.lastName = lastName;

    if (email && email !== user.email) {
      // Check if the email is already used by another user
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== req.user.id) {
        return res.status(400).json({ message: "Email already in use" });
      }
      updatedData.email = email;
    }

    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      updatedData.password = hashedPassword;
    }

    // Update user and return updated data
    const updatedUser = await User.findByIdAndUpdate(req.user.id, updatedData, {
      new: true, // Returns updated document
      runValidators: true, // Ensures all validation rules are checked
    });

    res.status(200).json({
      message: "User information updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

 module.exports = { registerUser, loginUser ,updateUser};




