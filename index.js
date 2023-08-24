require("dotenv").config();
const express = require("express");
const { connection } = require("./db");
const { userRoute } = require("./route/user.route");
const { blogRoute } = require("./route/blog.route");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(process.env.PORT, async () => {
  await connection;
  console.log(`server running on ${process.env.PORT}`);
});
