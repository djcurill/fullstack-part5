import React, { useState } from 'react';
import BlogBar from '../components/blogbar';
import BlogList from '../components/list';
import BlogForm from '../components/blogform';

const BlogView = (props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="blogview center">
      <BlogBar setShowModal={setShowModal}></BlogBar>
      <BlogList
        blogs={props.blogs}
        updateBlog={props.updateBlog}
        deleteBlog={props.deleteBlog}
      ></BlogList>
      {showModal && (
        <div className="modal">
          <BlogForm
            setShowModal={setShowModal}
            addBlog={props.addBlog}
          ></BlogForm>
        </div>
      )}
    </div>
  );
};

export default BlogView;
