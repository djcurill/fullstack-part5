import React from 'react';

const Blog = ({ blog }) => {
  return (
    <div className="card">
      <h1>{blog.title}</h1>
      <ul>
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
    </div>
  );
};

export default Blog;
