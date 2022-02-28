import React from 'react';
import PropTypes from 'prop-types';

import './custom-icon-button.styles.scss';

export default function CustomIconButton({iconClassName, handler, reversed, circle, ...props}) {
  return (
    <button className={`customIconButton ${reversed ? 'reversed' : ''} ${circle ? 'circle' : ''}`} onClick={handler} {...props}>
      <i className={iconClassName}/>
    </button>
  );
}

CustomIconButton.prototype = {
  iconClassName: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
};