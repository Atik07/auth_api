const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const isPresent = await User.findOne({ email });
  if (isPresent) {
    return res.send("user already exists!");
  }

  const user = new User({
    name,
    email,
    password,
  });

  try {
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
