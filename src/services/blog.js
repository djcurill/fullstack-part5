const axios = require('axios');
const baseUrl = '/api/blogs';

const getBlogs = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createBlog = async (blog, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const blogService = { getBlogs, createBlog };

export default blogService;
