import React from 'react';

import './form-textarea.styles.scss';

export default function FormTextarea({ handleChange, label, rows, ...props }) {
  return (
    <div className="formTextarea">
      <textarea
        rows={rows}
        className="formTextarea__textarea"
        onChange={handleChange}
        {...props}
      />
      {label ? (
        <label className={`${props.value.length ? 'shrink' : ''} formTextarea__label`}>
          {label}
        </label>
      ) : null}
    </div>
  );
}
