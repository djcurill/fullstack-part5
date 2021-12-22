import React from 'react';

const NavBar = () => {
  return (
    <header>
      <h1 className="logo">YouBlog</h1>
      <nav>
        <ul>
          <button className="pill-btn">Log In</button>
          <button className="pill-btn">Sign Up</button>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
