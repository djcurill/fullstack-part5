import React from 'react';

const NavBar = (props) => {
  return (
    <header>
      <h1 className="logo">YouBlog</h1>
      <nav>
        <ul>
          <button className="pill-btn" onClick={() => props.setIsLogin(true)}>
            Log In
          </button>
          <button className="pill-btn" onClick={() => props.setIsLogin(false)}>
            Sign Up
          </button>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
