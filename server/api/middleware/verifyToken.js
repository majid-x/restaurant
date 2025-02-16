const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  //console.log(req.headers.authorization);
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "Invalid authorization" });
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Invalid Token" });
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = verifyToken;
