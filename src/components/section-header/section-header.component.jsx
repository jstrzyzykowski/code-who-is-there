import React from 'react';

import './section-header.styles.scss';

export default function SectionHeader({children}) {
  return (
    <div className='sectionHeader'>
      <p className='sectionHeader__title'>
        {children}
      </p>
    </div>
  );
}