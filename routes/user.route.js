const express = require("express");
const { userModel } = require("../models/user.model");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
// const { createHashRouter } = require("react-router-dom");

const userRoute = express.Router();

// /login ==> For logging in generating a token
userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("email", email);
  console.log("password", password);
  try {
    const user = await userModel.find({ email });
    const hashPass = user[0].password;

    if (user.length > 0) {
      bcrypt.compare(password, hashPass, (err, result) => {
        if (result) {
          const token = jwt.sign({ userId: user[0]._id }, process.env.key);
          res.send({ message: "Login Success", token: token });
        } else {
          res.send({ message: "Please Check the credentails" });
        }
      });
    } else {
      res.send({ message: "Wrong Credentials" });
    }
  } catch (e) {
    res.send("Something went wrong");
    console.log(e.message);
  }
});

// /register ==> To register a new user.
userRoute.post("/register", async (req, res) => {
  const { name, email, gender, password } = req.body;

  try {
    bcrypt.hash(password, 5, async (err, security) => {
      if (err) {
        console.log(err);
      } else {
        const user = new userModel({
          name,
          email,
          gender,
          password: security,
        });
        await user.save();
        res.send({ message: "user succesfuly registered" });
      }
    });
  } catch (e) {
    res.send({ message: "Error occured" });
  }
});

module.exports = { userRoute };
