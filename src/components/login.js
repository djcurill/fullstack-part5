import propTypes from 'prop-types';
import React from 'react';

const NameField = ({ updateName }) => {
  NameField.propTypes = {
    updateName: propTypes.func.isRequired,
  };
  return (
    <div className="form__field">
      <label className="form__label" htmlFor="name">
        Name
      </label>
      <input type="text" id="name" onChange={(e) => updateName(e.target.value)} data-cy="name-input" />
    </div>
  );
};

const Login = ({ handleSubmit, updateName, updateUsername, updatePassword, login }) => {
  Login.propTypes = {
    handleSubmit: propTypes.func.isRequired,
    updateName: propTypes.func.isRequired,
    updateUsername: propTypes.func.isRequired,
    updatePassword: propTypes.func.isRequired,
    login: propTypes.bool.isRequired,
  };
  return (
    <form onSubmit={handleSubmit} data-cy="login-form">
      {!login && <NameField updateName={updateName} />}

      <div className="form__field">
        <label className="form__label" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          id="username"
          required
          onChange={(e) => updateUsername(e.target.value)}
          data-cy="username-input"
        />
      </div>

      <div className="form__field">
        <label className="form__label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          required
          id="password"
          onChange={(e) => updatePassword(e.target.value)}
          data-cy="password-input"
        />
      </div>

      <button type="submit" className="center">
        {login ? 'Login' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
