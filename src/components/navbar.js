import propTypes from 'prop-types';
import React from 'react';
import UserInfo from './userinfo';

const loginButtons = (setIsLogin) => (
  <>
    <button type="button" className="pill-btn" onClick={() => setIsLogin(true)}>
      Log In
    </button>
    <button type="button" className="pill-btn" onClick={() => setIsLogin(false)}>
      Sign Up
    </button>
  </>
);

const logoutButton = (handleLogOut) => (
  <button type="button" className="pill-btn" onClick={() => handleLogOut()}>
    Logout
  </button>
);

const NavBar = ({ user, setIsLogin, handleLogout }) => {
  NavBar.propTypes = {
    user: propTypes.object.isRequired,
    setIsLogin: propTypes.func.isRequired,
    handleLogout: propTypes.func.isRequired,
  };
  return (
    <header>
      <h1 className="logo">YouBlog</h1>
      <nav>
        <ul>
          {user && <UserInfo user={user} />}
          {!user ? loginButtons(setIsLogin) : logoutButton(handleLogout)}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
