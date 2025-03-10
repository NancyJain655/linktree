const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require("./routes/userRoutes");
const linkRoutes = require("./routes/linkRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const appearanceRoutes = require("./routes/appearanceRoutes");

const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/links", linkRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/appearance", appearanceRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});