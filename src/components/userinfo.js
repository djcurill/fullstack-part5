import propTypes from 'prop-types';
import React from 'react';

const UserInfo = ({ user }) => <p className="userinfo">Welcome, {user.username}</p>;

UserInfo.propTypes = {
  user: propTypes.object.isRequired,
};

export default UserInfo;
