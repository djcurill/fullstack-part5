import React, { useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

const Toggleable = (props) => {
  const [show, setShow] = useState(false);

  const buttonLabel = show ? <RiArrowUpSLine /> : <RiArrowDownSLine />;
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
