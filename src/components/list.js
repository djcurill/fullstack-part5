import React from 'react';
import Blog from './blog';
import _ from 'lodash';

const BlogList = ({ blogs, updateBlog, deleteBlog }) => {
  return (
    <div>
      {_.orderBy(blogs, (b) => b.likes, ['desc']).map((b) => (
        <Blog
          key={b.id.toString()}
          blog={b}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
        ></Blog>
      ))}
    </div>
  );
};

export default BlogList;
