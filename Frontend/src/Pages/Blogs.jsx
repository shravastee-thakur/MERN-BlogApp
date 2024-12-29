import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../Components/BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  //get blogs
  const getAllBlogs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/blog/all-blogs"
      );
      if (res.data.success) {
        setBlogs(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <div>
      {blogs &&
        blogs.map((blog) => {
          return (
            <BlogCard
              title={blog.title}
              description={blog.description}
              image={blog.image}
              username={blog.username}
              time={blog.createdAt}
            />
          );
        })}
    </div>
  );
};

export default Blogs;
