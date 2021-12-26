import React from 'react';
import UserInfo from './userinfo';

const loginButtons = (setIsLogin) => {
  return (
    <>
      <button className="pill-btn" onClick={() => setIsLogin(true)}>
        Log In
      </button>
      <button className="pill-btn" onClick={() => setIsLogin(false)}>
        Sign Up
      </button>
    </>
  );
};

const logoutButton = (handleLogOut) => {
  return (
    <>
      <button className="pill-btn" onClick={() => handleLogOut()}>
        Logout
      </button>
    </>
  );
};

const NavBar = (props) => {
  return (
    <header>
      <h1 className="logo">YouBlog</h1>
      <nav>
        <ul>
          {props.user && <UserInfo user={props.user}></UserInfo>}
          {!props.user
            ? loginButtons(props.setIsLogin)
            : logoutButton(props.handleLogout)}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
