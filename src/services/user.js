const axios = require('axios');

const baseUrl = '/api/users';

const createUser = async (userInfo) => {
  const response = await axios.post(baseUrl, userInfo);
  return response.data;
};

const userService = { createUser };

export default userService;
