const express = require("express");
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

  res.redirect("/");
});

module.exports = router;
