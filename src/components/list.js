import React from 'react';
import Blog from './blog';

const BlogList = ({ blogs, updateBlog }) => {
  return (
    <div>
      {blogs.map((b) => (
        <Blog key={b.id.toString()} blog={b} updateBlog={updateBlog}></Blog>
      ))}
    </div>
  );
};

export default BlogList;
