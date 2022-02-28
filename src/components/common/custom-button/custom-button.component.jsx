import React from 'react';
import PropTypes from 'prop-types';

import ButtonLoader from '../button-loader/button-loader.component';

import './custom-button.styles.scss';

export default function CustomButton({children, reversed, fluid, blue, green, red, loader = false, ...props}) {
  return (
    <button className={`customButton ${reversed ? 'reversed' : ''} ${fluid ? 'fluid': ''} ${blue ? 'blue' : ''} ${green ? 'green' : ''} ${red ? 'red' : ''}`} {...props}>
      {loader ? <ButtonLoader/> : children}
    </button>
  );
}

CustomButton.propTypes = {
  reversed: PropTypes.bool,
  onClick: PropTypes.func,
  fluid: PropTypes.bool,
  blue: PropTypes.bool,
  green: PropTypes.bool,
};