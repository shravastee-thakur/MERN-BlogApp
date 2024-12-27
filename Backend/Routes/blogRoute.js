import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  userBlog,
} from "../Controller/blogController.js";

const route = express.Router();

// create blog
route.post("/create-blog", createBlog);

// get all blogs
route.get("/all-blogs", getAllBlogs);

// get single blog
route.get("/single-blog/:id", getBlog);

// update blog
route.put("/update-blog/:id", updateBlog);

// delete blog
route.delete("/delete-blog/:id", deleteBlog);

// get user blogs
route.get("/user-blogs/:id", userBlog);

export default route;
