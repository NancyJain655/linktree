const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = (req, res, next) => {
  let token;

  // Check if token exists in cookies or headers
  if (req.cookies.token) {
    token = req.cookies.token;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // If no token found, return error
  if (!token) {
    return res
      .status(401)
      .json({ message: "This action is not allowed, token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user data to request
    console.log(req.user);
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;