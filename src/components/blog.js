import React from 'react';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';
import propTypes from 'prop-types';
import Toggleable from './toggle';

const BlogDetails = ({ blog }) => {
  BlogDetails.propTypes = {
    blog: propTypes.object.isRequired,
  };
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
  Blog.propTypes = {
    blog: propTypes.object.isRequired,
    updateBlog: propTypes.func.isRequired,
    deleteBlog: propTypes.func.isRequired,
  };

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
      <button type="button" className="blog-header-btn" onClick={addLike}>
        <FaRegThumbsUp />
      </button>
      <button type="button" className="blog-header-btn" onClick={addDislike}>
        <FaRegThumbsDown />
      </button>
      <button type="button" className="blog-header-btn" onClick={() => deleteBlog(blog)}>
        <RiDeleteBinLine />
      </button>
      <Toggleable>
        <BlogDetails blog={blog} />
      </Toggleable>
    </div>
  );
};

export default Blog;
