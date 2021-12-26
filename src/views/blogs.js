import React, { useState } from 'react';
import BlogBar from '../components/blogbar';
import BlogList from '../components/list';
import BlogForm from '../components/blogform';

const BlogView = (props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="blogview center">
      <BlogBar setShowModal={setShowModal}></BlogBar>
      <BlogList blogs={props.blogs}></BlogList>
      {showModal && (
        <div className="modal">
          <BlogForm
            setShowModal={setShowModal}
            setBlogs={props.setBlogs}
            currentBlogs={props.blogs}
            handleBlogSubmit={props.handleBlogSubmit}
            user={props.user}
          ></BlogForm>
        </div>
      )}
    </div>
  );
};

export default BlogView;
