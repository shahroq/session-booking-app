const User = require("../models/user");

// read all users: for test new model
exports.getHome = async (req, res, next) => {
  console.log(User);
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching users", details: error.message });
  }
};
