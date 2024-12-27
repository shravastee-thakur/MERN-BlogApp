import mongoose from "mongoose";
import Blog from "../Model/blogModel.js";
import User from "../Model/userModel.js";

export const getAllBlogs = async (_, res) => {
  try {
    const blogs = await Blog.find({});
    if (blogs.length === 0) {
      return res.status(404).json({ success: false, message: "No blog found" });
    }
    return res.status(200).json({ data: blogs, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// export const createBlog = async (req, res) => {
//   try {
//     const { title, description, image, user } = req.body;

//     // validation
//     if (!title || !description || !image || !user) {
//       return res
//         .status(400)
//         .json({ success: false, message: "All fields are required" });
//     }
//     const userExist = await User.findById(user);
//     if (!userExist) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     // new blog
//     const createBlog = new Blog({ title, description, image, user });
//     const session = await mongoose.startSession();
//     session.startTransaction();
//     await createBlog.save({ session });
//     userExist.blogs.push(createBlog);
//     await userExist.save({ session });
//     await session.commitTransaction();
//     // await createBlog.save();
//     return res.status(201).json({
//       data: createBlog,
//       success: true,
//       message: "Blog created successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

export const createBlog = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;

    // Validation
    if (!title || !description || !image || !user) {
      return res.status(400).json({
        success: false,
        message: "All fields (title, description, image, user) are required",
      });
    }

    const userExist = await User.findById(user);
    if (!userExist) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Start transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    const createBlog = new Blog({ title, description, image, user });
    await createBlog.save({ session });

    userExist.blogs.push(createBlog);
    await userExist.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: createBlog,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the blog",
    });
  }
};

export const getBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById({ _id: blogId });
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    return res.status(200).json({ data: blog, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const updatedBlog = await Blog.findByIdAndUpdate(
      { _id: blogId },
      { ...req.body },
      { new: true }
    );
    updatedBlog.save();
    return res.status(200).json({
      data: updatedBlog,
      success: true,
      message: "Blog updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const deletedBlog = await Blog.findByIdAndDelete(
      { _id: blogId },
      { ...req.body },
      { new: true }
    ).populate("user");

    await deletedBlog.user.blogs.pull(blogId);
    deletedBlog.user.save();

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const userBlog = async (req, res) => {
  try {
    const userId = req.params.id;
    const userBlog = await User.findById({ _id: userId }).populate("blogs");
    // console.log(userBlog);

    if (userBlog.blogs.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Blogs not found for this user" });
    }
    return res
      .status(200)
      .json({ data: userBlog, success: true, message: "User blogs" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
