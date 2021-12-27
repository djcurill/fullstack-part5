const axios = require('axios');

const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getBlogs = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createBlog = async (blog) => {
  const config = {
    headers: { Authorization: `${token}` },
  };

  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const updateBlog = async (blog) => {
  const config = {
    headers: { Authorization: `${token}` },
  };
  const response = await axios.put(baseUrl, blog, config);
  return response.data;
};

const deleteBlog = async (blog) => {
  const config = {
    headers: { Authorization: `${token}` },
  };
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config);
  return response.data;
};

const blogService = { getBlogs, createBlog, updateBlog, deleteBlog, setToken };

export default blogService;
