import React, { useState } from 'react';

const Toggleable = (props) => {
  const [show, setShow] = useState(false);

  const buttonLabel = show ? 'Hide' : 'Show';
  return (
    <div className="toggle-layout">
      {show && props.children}
      <button
        className="toggle-btn"
        onClick={() => {
          setShow(!show);
        }}
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default Toggleable;
