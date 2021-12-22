import React from 'react';

const NameField = () => {
  return (
    <div className="form__field">
      <label className="form__label">Name</label>
      <input type="text" />
    </div>
  );
};

const Login = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      {!props.login && <NameField></NameField>}

      <div className="form__field">
        <label className="form__label">Username</label>
        <input
          type="text"
          required
          onChange={(e) => props.updateUsername(e.target.value)}
        />
      </div>

      <div className="form__field">
        <label className="form__label">Password</label>
        <input
          type="password"
          required
          onChange={(e) => props.updatePassword(e.target.value)}
        />
      </div>

      <button type="submit" className="center">
        {props.login ? 'Login' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
