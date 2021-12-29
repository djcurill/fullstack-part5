import propTypes from 'prop-types';
import React, { useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

const Toggleable = ({ children }) => {
  Toggleable.propTypes = {
    children: propTypes.oneOfType([propTypes.arrayOf(propTypes.element), propTypes.element]),
  };
  const [show, setShow] = useState(false);

  const buttonLabel = show ? <RiArrowUpSLine /> : <RiArrowDownSLine />;
  return (
    <div className="toggle-layout">
      {show && children}
      <button
        type="button"
        className="toggle-btn"
        data-testid="toggle"
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
