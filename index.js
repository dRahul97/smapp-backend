const express = require("express");
const { connection } = require("./db");
const cors = require("cors");
const { userRoute } = require("./routes/user.route");
const { authentication } = require("./middlewares/authentication.middleware");
const { postRoute } = require("./routes/post.route");
require("dotenv").config();

const application = express();

application.use(express.json());
application.use(cors());

application.get("/", (req, res) => {
  res.send("Welcome To Homepage");
});

application.use("/users", userRoute);
application.use(authentication);
application.use("/posts", postRoute);

application.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`Server is runnning ${process.env.PORT}`);
  } catch (e) {
    console.log(e);
  }
});
