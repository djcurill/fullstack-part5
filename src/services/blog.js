const axios = require('axios');
const baseUrl = '/api/blogs';

const getBlogs = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const blogService = { getBlogs };

export default blogService;