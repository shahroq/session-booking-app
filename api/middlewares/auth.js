const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwt_secret = process.env.JWT_SECRET;

const getToken = (req) => {
  console.log("- req.header from auth.js (getToken): ");
  console.log(req.header("Authorization"));

  const token = req.header("Authorization");

  return token;
};

exports.isAuth = async (req, res, next) => {
  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), jwt_secret);

    req.user = decoded; // add user info to request
    next();
  } catch (error) {
    // console.log(error)
    res.status(401).json({ error: "Invalid token" + error });
  }
};

exports.isTherapist = async (req, res, next) => {
  if (req.user.role !== "therapist") {
    return res.status(403).json({
      error: "Access denied. Only therapists can perform this action.",
    });
  }
  next();
};

exports.isClient = async (req, res, next) => {
  if (req.user.role !== "client") {
    return res.status(403).json({
      error: "Access denied. Only clients can perform this action.",
    });
  }
  next();
};
