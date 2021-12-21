import React from 'react';

const NameField = () => {
  return (
    <div className="form__field">
      <label className="form__label">Name</label>
      <input type="text" />
    </div>
  );
};

const Login = ({ login = true }) => {
  return (
    <form>
      {!login && <NameField></NameField>}

      <div className="form__field">
        <label className="form__label">Username</label>
        <input type="text" />
      </div>

      <div className="form__field">
        <label className="form__label">Password</label>
        <input type="password" />
      </div>

      <button type="submit" className="center">
        {login ? 'Login' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
