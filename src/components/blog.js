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
        <li data-testid="urlInfo">
          <strong>URL: </strong>
          {blog.url}
        </li>
      )}
      <li data-testid="numLikes">
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
      <h1 data-cy="blog-header">{blog.title}</h1>
      <button type="button" className="blog-header-btn like" onClick={addLike} data-cy="like-button">
        <FaRegThumbsUp />
      </button>
      <button type="button" className="blog-header-btn dislike" onClick={addDislike} data-cy="dislike-button">
        <FaRegThumbsDown />
      </button>
      <button type="button" className="blog-header-btn delete" onClick={() => deleteBlog(blog)} data-cy="delete-button">
        <RiDeleteBinLine />
      </button>
      <Toggleable>
        <BlogDetails blog={blog} className="blogdetails" />
      </Toggleable>
    </div>
  );
};

export default Blog;
