import React from 'react';

import './statisticker.styles.scss';

export default function Statisticker({iconClassName, value}) {
  return (
    <div className='statisticker'>
      <i className={iconClassName}/>
      <p className='statisticker__value'>{value}</p>
    </div>
  );
}