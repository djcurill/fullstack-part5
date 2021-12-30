import React, { useState } from 'react';
import propTypes from 'prop-types';
import BlogBar from '../components/blogbar';
import BlogList from '../components/list';
import BlogForm from '../components/blogform';

const BlogView = ({ blogs, addBlog, updateBlog, deleteBlog }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="blogview center" data-cy="blog-view">
      <BlogBar setShowModal={setShowModal} />
      <BlogList blogs={blogs} updateBlog={updateBlog} deleteBlog={deleteBlog} />
      {showModal && (
        <div className="modal">
          <BlogForm setShowModal={setShowModal} addBlog={addBlog} />
        </div>
      )}
    </div>
  );
};

BlogView.propTypes = {
  blogs: propTypes.arrayOf(propTypes.object).isRequired,
  addBlog: propTypes.func.isRequired,
  updateBlog: propTypes.func.isRequired,
  deleteBlog: propTypes.func.isRequired,
};

export default BlogView;
