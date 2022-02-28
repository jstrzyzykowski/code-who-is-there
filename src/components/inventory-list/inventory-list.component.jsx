import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import ShopitemListFilter from '../shopitem-list-filter/shopitem-list-filter.component';
import InventoryListItem from '../inventory-list-item/inventory-list-item.component';
import EmptyInfo from '../empty-info/empty-info.component';

import './inventory-list.styles.scss';

export default function InventoryList() {
  const {currentUser} = useSelector(createStructuredSelector({
    currentUser: selectCurrentUser,
  }));
  const [filter, setFilter] = useState('all');

  const handleChange = (type) => {
    if(type !== filter) setFilter(type);
  }

  return (
    <div className='inventoryList'>
      <div className='inventoryList__filters'>
        <ShopitemListFilter labelName='Wszystko' checked={filter === 'all'} handler={() => handleChange('all')}/>
        <ShopitemListFilter labelName='Amunicja' checked={filter === 'ammunition'} handler={() => handleChange('ammunition')}/>
        <ShopitemListFilter labelName='Pancerze' checked={filter === 'armor'} handler={() => handleChange('armor')}/>
        <ShopitemListFilter labelName='Kontenery' checked={filter === 'box'} handler={() => handleChange('box')}/>
        <ShopitemListFilter labelName='Bronie' checked={filter === 'gun'} handler={() => handleChange('gun')}/>
        <ShopitemListFilter labelName='Części' checked={filter === 'part'} handler={() => handleChange('part')}/>
      </div>
      <div className={`inventoryList__items ${currentUser.inventory.length === 0 ? 'empty' : ''}`}>
        {currentUser.inventory.length === 0
          ? <EmptyInfo title='Brak przedmiotów' description='Bez przedmiotów stajesz się łatwym celem agresywnych emiterów - ochroń swoje ciężko zdobyte zębatki!'/>
          : currentUser.inventory.filter((item) => filter === 'all' ? item : item.type === filter).map((item) => <InventoryListItem key={item.id} {...item}/>)}
      </div>
    </div>
  );
}