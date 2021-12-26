import React from 'react';
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

const Blog = ({ blog }) => {
  return (
    <div className="card">
      <h1>{blog.title}</h1>
      <button className="like-button">
        <FaRegThumbsUp />
      </button>
      <button className="like-button dislike-button">
        <FaRegThumbsDown />
      </button>
      <Toggleable>
        <BlogDetails blog={blog} />
      </Toggleable>
    </div>
  );
};

export default Blog;
