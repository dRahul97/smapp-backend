const express = require("express");
const { postModel } = require("../models/post.model");

const postRoute = express.Router();

postRoute.get("/", async (req, res) => {
  const query = {};
  try {
    const { title, body, device } = req.query;

    if (device) {
      query.device = device;
    }
    const note = await postModel.find(query);
    res.send(note);
  } catch (e) {
    console.log(e);
    res.send({ message: "Somethng went wrong" });
  }
});

postRoute.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const post = await postModel.findOne({ _id: id });
  const userID_post = post.userID;
  const userID_req = req.body.userID;
  try {
    if (userID_post !== userID_req) {
      res.send({ message: "You are not authorized" });
    } else {
      await postModel.findByIdAndUpdate({ _id: id, payload });
      res.send("Updated post successfully");
    }
  } catch (e) {
    console.log(e.message);
    res.send({ message: "Something wrong" });
  }
});

postRoute.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const post = await postModel.findOne({ _id: id });
  const userID_post = post.userID;
  const userID_req = req.body.userID;
  try {
    if (userID_post !== userID_req) {
      res.send({ message: "You are not authorized" });
    } else {
      await postModel.findByIdAndDelete({ _id: id });
      res.send("Deleted post successfully");
    }
  } catch (e) {
    console.log(e.message);
    res.send({ message: "Something wrong" });
  }
});

module.exports = { postRoute };
