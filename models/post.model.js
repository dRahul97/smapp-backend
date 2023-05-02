const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: String,
  body: String,
  device: String,
});

const postModel = mongoose.model("post", postSchema);

module.exports = { postModel };
