import React from 'react';
import _ from 'lodash';
import propTypes from 'prop-types';
import Blog from './blog';

const BlogList = ({ blogs, updateBlog, deleteBlog }) => {
  BlogList.propTypes = {
    blogs: propTypes.arrayOf(propTypes.object),
    updateBlog: propTypes.func.isRequired,
    deleteBlog: propTypes.func.isRequired,
  };
  return (
    <div>
      {_.orderBy(blogs, (b) => b.likes, ['desc']).map((b) => (
        <Blog key={b.id.toString()} blog={b} updateBlog={updateBlog} deleteBlog={deleteBlog} />
      ))}
    </div>
  );
};

export default BlogList;
