import { React, useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ setShowModal, addBlog }) => {
  BlogForm.propTypes = {
    setShowModal: PropTypes.func.isRequired,
    addBlog: PropTypes.func.isRequired,
  };

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleBlogSubmit = () => {
    setShowModal(false);

    // create new blog
    const blog = { title, author, url };
    addBlog(blog);
  };

  return (
    <form className="blogform" onSubmit={handleBlogSubmit}>
      <div className="form__field">
        <label htmlFor="blog-title">Title</label>
        <input type="text" value={title} id="blogtitle" required onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="form__field">
        <label htmlFor="blog-author">Author</label>
        <input type="text" value={author} id="blog-author" required onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <div className="form__field">
        <label htmlFor="blog-url">Url</label>
        <input
          type="text"
          value={url}
          id="blog-url"
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
      </div>
      <div>
        <button type="submit">Create</button>
        <button type="button" onClick={() => setShowModal(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
