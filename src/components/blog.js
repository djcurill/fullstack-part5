import React, { useState } from 'react';
import Toggleable from './toggle';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';

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

const Blog = ({ blog, updateBlog }) => {
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
      <button className="like-button" onClick={addLike}>
        <FaRegThumbsUp />
      </button>
      <button className="like-button" onClick={addDislike}>
        <FaRegThumbsDown />
      </button>
      <Toggleable>
        <BlogDetails blog={blog} />
      </Toggleable>
    </div>
  );
};

export default Blog;
