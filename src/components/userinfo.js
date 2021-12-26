import React from 'react';

const UserInfo = ({ user }) => {
  return <p className="userinfo">Welcome, {user.username}</p>;
};

export default UserInfo;
