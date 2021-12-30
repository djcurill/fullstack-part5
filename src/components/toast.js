import propTypes from 'prop-types';
import React from 'react';

const Notification = ({ message = '', type }) => {
  Notification.propTypes = {
    message: propTypes.string,
    type: propTypes.string,
  };
  const style = `toast center ${type}`;
  return (
    <div className={style} data-cy="toast-notification">
      <p>{message}</p>
    </div>
  );
};

export default Notification;
