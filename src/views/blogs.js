import React from 'react';
import BlogBar from '../components/blogbar';
import BlogList from '../components/list';

const BlogView = ({ blogs }) => {
  return (
    <div>
      <BlogBar></BlogBar>
      <BlogList blogs={blogs}></BlogList>
    </div>
  );
};

export default BlogView;
