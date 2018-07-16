const jwt = require("jsonwebtoken");

module.exports = function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  // console.log(authHeader);

  if (!authHeader) return next();

  const token = authHeader.split(" ")[1];

  jwt.verify(token, "spiderman", function(err, user) {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Please register Log in using a valid email to submit posts",
      });
    } else {
      req.user = user;
      next();
    }
  });
};
