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
        name: user.name,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
const updateUser= async (req, res)=> {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await User.findById(req.user.id);
    console.log(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      user.password = hashedPassword;
    }
    await user.save();
    res
      .status(200)
      .json({ message: "User information updated successfully", data: user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
 module.exports = { registerUser, loginUser ,updateUser};




