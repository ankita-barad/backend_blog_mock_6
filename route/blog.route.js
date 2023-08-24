const express = require("express");
const { BlogModel } = require("../model/blog.model");
const { UserModel } = require("../model/user.model");
const { auth } = require("../middleware/auth");

const blogRoute = express.Router();

blogRoute.post("/blogs", async (req, res) => {
  try {
    const { title, content, category, date } = req.body;

    const newBlog = new BlogModel({
      title,
      content,
      category,
      date,
    });
    await newBlog.save();
    res.status(200).send(newBlog);
  } catch (error) {
    console.log(error);
    res.status(400).send("Internal Error");
  }
});

blogRoute.get("/blogs", async (req, res) => {
  try {
    const { title, category } = req.params;
    let q = {};
    if (title) {
      q.title = title;
    }
    if (category) {
      q.category = { $regex: search, $options: "i" };
    }

    const blogs = await BlogModel.find(q);
    res.status(200).send(blogs);
  } catch (error) {
    console.log(error);
    res.status(400).send("Internal Error");
  }
});

blogRoute.patch("/blogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogModel.findByIdAndUpdate(
      id,
      {
        title,
        content,
        category,
        date,
      },
      { new: true }
    );
    res.status(200).send(blog);
  } catch (error) {
    console.log(error);
    res.status(400).send("Internal Error");
  }
});

blogRoute.delete("/blogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogModel.findByIdAndDelete(id);
    res.status(200).send(blog);
  } catch (error) {
    console.log(error);
    res.status(400).send("Internal Error");
  }
});

module.exports = { blogRoute };
