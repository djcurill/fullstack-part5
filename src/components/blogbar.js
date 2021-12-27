// create a header for showing all blogs and adding a new blog
import React from 'react';
import PropTypes from 'prop-types';

const BlogBar = ({ setShowModal }) => {
  BlogBar.propTypes = {
    setShowModal: PropTypes.func.isRequired,
  };

  return (
    <div className="blogbar">
      <button type="button" className="transparent-btn" onClick={() => setShowModal(true)}>
        New Blog
      </button>
    </div>
  );
};

export default BlogBar;
