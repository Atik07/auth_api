const express = require("express");
const router = express.Router();
require("dotenv").config();

const User = require("../models/user");

const jwt = require("jsonwebtoken");

router.get("/user", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {
    if (err) {
      return res.send("missing token -- relogin");
    }
    const userDetails = await User.findOne(
      { email: decoded.email },
      { password: 0 } //so that password is not fetched
    );

    res.send({ userDetails });
  });
});
module.exports = router;
