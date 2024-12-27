import Blog from "../Model/blogModel.js";

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

export const createBlog = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    // validation
    if (!title || !description || !image) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    // create blog
    const createBlog = new Blog({ title, description, image });
    await createBlog.save();
    return res.status(201).json({ data: createBlog, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
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
    );
    deletedBlog.save();
    return res.status(200).json({
      data: deletedBlog,
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
