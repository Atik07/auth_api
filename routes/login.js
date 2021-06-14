const express = require("express");
require("dotenv").config(); //no need to create a const
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/user");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const isPresent = await User.findOne({ email });
  //isPresent contains the whole document .. there is no need for another db call
  if (!isPresent) {
    return res.send("user doesn't exist!");
  }
  if (password != isPresent.password) {
    return res.send("incorrect password");
  }

  try {
    jwt.sign(
      { email: isPresent.email },
      process.env.TOKEN_KEY,
      { expiresIn: "1h" },
      (err, token) => {
        res.send(token);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
