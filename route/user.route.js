const express = require("express");
const userRoute = express.Router();
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRoute.post("/register", async (req, res) => {
  try {
    const { username, image, email, password } = req.body;
    bcrypt.hash(password, 10, async function (err, hash) {
      const newUser = new UserModel({
        username,
        image,
        email,
        password: hash,
      });
      await newUser.save();
      res.status(200).send(newUser);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Internal Error");
  }
});

userRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.find({ email });
    console.log(user);

    if (!user) {
      console.log("Unauthorizes access");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(200).send({ token: token });
  } catch (error) {
    console.log(error);
    res.status(400).send("Internal Error");
  }
});

module.exports = { userRoute };
