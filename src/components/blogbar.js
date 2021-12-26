// create a header for showing all blogs and adding a new blog
import React from 'react';

const BlogBar = (props) => {
  return (
    <>
      <div className="blogbar">
        <button
          className="transparent-btn"
          onClick={() => props.setShowModal(true)}
        >
          New Blog
        </button>
      </div>
    </>
  );
};

export default BlogBar;
