import React from 'react';
import Toggleable from './toggle';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';

const BlogDetails = ({ blog }) => {
  return (
    <ul className="blogdetails">
      <li>
        <strong>Author: </strong>
        {blog.author}
      </li>
      {blog.url && (
        <li>
          <strong>URL: </strong>
          {blog.url}
        </li>
      )}
      <li>
        <strong>Likes:</strong> {blog.likes}
      </li>
    </ul>
  );
};

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const addLike = () => {
    blog.likes += 1;
    updateBlog(blog);
  };

  const addDislike = () => {
    if (blog.likes > 0) {
      blog.likes -= 1;
      updateBlog(blog);
    }
  };

  return (
    <div className="card">
      <h1>{blog.title}</h1>
      <button className="blog-header-btn" onClick={addLike}>
        <FaRegThumbsUp />
      </button>
      <button className="blog-header-btn" onClick={addDislike}>
        <FaRegThumbsDown />
      </button>
      <button className="blog-header-btn" onClick={() => deleteBlog(blog)}>
        <RiDeleteBinLine></RiDeleteBinLine>
      </button>
      <Toggleable>
        <BlogDetails blog={blog} />
      </Toggleable>
    </div>
  );
};

export default Blog;
