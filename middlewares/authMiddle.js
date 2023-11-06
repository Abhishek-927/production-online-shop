const jwt = require("jsonwebtoken");
const User = require("../models/User");

//Protected Router Token Based

const signinRequired = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).send({ error: "Please authenticate token" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data;
    return next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Please authenticate using valid token" });
  }
};

//Admin Access
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user || user.role !== "ADMIN") {
      return res.send({
        success: false,
        msg: "anothorize user",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { signinRequired, isAdmin };
