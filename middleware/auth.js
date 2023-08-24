const express = require("express");
const jwt = require("jsonwebtoken");
// const { UserModel } = require("../model/user.model");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      console.log("unauthorized access");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);
    const { userId } = decodedToken;
    req.userId = userId;
    next();
  } catch (error) {
    console.log(error);
    console.log("unauthorized access");
  }
};

module.exports = { auth };
