import React from 'react';
const Blog = require('./blog');

const BlogList = ({ blogs }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog blog={blog}></Blog>
      ))}
    </div>
  );
};

export default BlogList;
