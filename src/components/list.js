import React from 'react';
import Blog from './blog';

const BlogList = ({ blogs }) => {
  console.log(blogs);
  return (
    <div>
      {blogs.map((b) => (
        <Blog key={b.id.toString()} blog={b}></Blog>
      ))}
    </div>
  );
};

export default BlogList;
