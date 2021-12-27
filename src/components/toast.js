import React from 'react';

const Notification = ({ message, type }) => {
  const style = 'toast center ' + type;
  return (
    <div className={style}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
