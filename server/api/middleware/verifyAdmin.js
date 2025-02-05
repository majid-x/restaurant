const jwt = require("jsonwebtoken");
const User = require("../modals/User");

const verifyAdmin = async (req, res, next) => {
  if (!req.decoded || !req.decoded.email) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const email = req.decoded.email;
  try {
    const user = await User.findOne({ email });
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden access" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = verifyAdmin;
