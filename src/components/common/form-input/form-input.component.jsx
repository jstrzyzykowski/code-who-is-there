import React from 'react';
import PropTypes from 'prop-types';

import './form-input.styles.scss';

export default function FormInput({ handleChange, label, disabled, ...props }) {
  return (
    <div className="formInput">
      <input className="formInput__input" onChange={handleChange} disabled={disabled} {...props} autoComplete="off"/>
      {label ? (
        <label className={`${props.value.length ? 'shrink' : ''} ${disabled ? 'disabled' : ''} formInput__label`}>
          <i className={label}/>
        </label>
      ) : null}
    </div>
  );
}

FormInput.prototype = {
  handleChange: PropTypes.func,
  label: PropTypes.string,
};
