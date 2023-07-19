const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Invalid or missing token" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Invalid or missing token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = data;
    next();
  });
};

module.exports = authenticateToken;
