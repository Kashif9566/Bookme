const jwt = require("jsonwebtoken");
const secretKey = "myapp";
const generateToken = (id) => {
  return jwt.sign({ id }, secretKey, {
    expiresIn: "10d",
  });
};

module.exports = generateToken;
