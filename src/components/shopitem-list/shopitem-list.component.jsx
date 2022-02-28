import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import ShopitemListItem from '../shopitem-list-item/shopitem-list-item.component';
import ShopitemListFilter from '../shopitem-list-filter/shopitem-list-filter.component';

import './shopitem-list.styles.scss';

export default function ShopitemList() {
  const {items} = useSelector((state) => state.item);
  const [filter, setFilter] = useState('all');

  const handleChange = (type) => {
    if(type !== filter) setFilter(type);
  }

  return(
    <div className='shopitemList'>
      <div className='shopitemList__filters'>
        <ShopitemListFilter labelName='Wszystko' checked={filter === 'all'} handler={() => handleChange('all')}/>
        <ShopitemListFilter labelName='Amunicja' checked={filter === 'ammunition'} handler={() => handleChange('ammunition')}/>
        <ShopitemListFilter labelName='Pancerze' checked={filter === 'armor'} handler={() => handleChange('armor')}/>
        <ShopitemListFilter labelName='Kontenery' checked={filter === 'box'} handler={() => handleChange('box')}/>
        <ShopitemListFilter labelName='Bronie' checked={filter === 'gun'} handler={() => handleChange('gun')}/>
        <ShopitemListFilter labelName='Części' checked={filter === 'part'} handler={() => handleChange('part')}/>
      </div>
      <div className='shopitemList__items'>
        {items.filter((item) => {
          if(filter === 'all') return item.type !== 'system';
          return item.type === filter;
        }).map((item) => <ShopitemListItem key={item.id} item={item}/>)}
      </div>
    </div>
  );
}