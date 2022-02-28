import React from 'react';

import { useSelector } from 'react-redux';

import ShopitemList from '../../../components/shopitem-list/shopitem-list.component';
import InfoBox from '../../../components/common/info-box/info-box.component';

import './shop.styles.scss';

export default function ShopPage() {
  const item = useSelector((state) => state.item);

  //@TODO: Instead of [] initial state give null, then checking !item.items then shopitemloader else shopitemlist
  return (
    <div className='shopPage'>
      <InfoBox/>
      {item.isFetching ? <h1>Wczytuje...</h1> : <ShopitemList/>}
    </div>
  );
}