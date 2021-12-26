import React, { useState } from 'react';
import blogService from '../services/blog';

const BlogForm = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleBlogSubmit = async () => {
    props.setShowModal(false);

    console.log('before creating blog');
    console.log(`user: ${JSON.stringify(props.user)}`);
    // create new blog
    const blog = { title, author, url };
    const returnedBlog = await blogService.createBlog(blog, props.user.token);

    // update blog state
    const allBlogs = props.currentBlogs.concat(returnedBlog);
    props.setBlogs(allBlogs);
  };

  return (
    <form className="blogform" onSubmit={handleBlogSubmit}>
      <div className="form__field">
        <label htmlFor="blog-title">Title</label>
        <input
          type="text"
          value={title}
          id="blog-title"
          required
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </div>
      <div className="form__field">
        <label htmlFor="blog-author">Author</label>
        <input
          type="text"
          value={author}
          id="blog-author"
          required
          onChange={(e) => setAuthor(e.target.value)}
        ></input>
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
        ></input>
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default BlogForm;
