import React from 'react';
import Toggleable from './toggle';

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
    </ul>
  );
};

const Blog = ({ blog }) => {
  return (
    <div className="card">
      <h1>{blog.title}</h1>
      <Toggleable>
        <BlogDetails blog={blog} />
      </Toggleable>
    </div>
  );
};

export default Blog;
