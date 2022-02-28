import React from 'react';

import './shopitem-list-filter.styles.scss';

export default function ShopitemListFilter({labelName, checked, handler}) {
  return (
    <label className='shopitemListFilter'>
      <input type='radio' checked={checked} name='shopItemsFilter' onChange={handler}/>
      <p className='shopitemListFilter__checkmark'>{labelName}</p>
    </label>
  );
}