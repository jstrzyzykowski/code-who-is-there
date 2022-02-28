import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {openModal} from '../../redux/modal/modal.actions';

import CustomButton from '../common/custom-button/custom-button.component';

import './shopitem-list-item.styles.scss';

export default function ShopitemListItem({item}) {
  const {gears} = useSelector((state) => state.user.currentUser.emiter);
  const {displayName, price, imageUrl, statistics} = item;
  const {battery, rage, shield} = statistics;
  const dispatch = useDispatch();

  return (
    <div className='shopitemListItem'>
      <div className='shopitemListItem__header'>
        <p className='shopitemListItem__header-displayName'>{displayName}</p>
      </div>
      <div className='shopitemListItem__body'>
        <div className='shopitemListItem__body-itemInfoContainer'>
          <div className='shopitemListItem__body-itemInfoContainer-imageContainer'>
            <img src={imageUrl} alt='' />
          </div>
          <div className='shopitemListItem__body-itemInfoContainer-statList'>
            <div className='shopitemListItem__body-itemInfoContainer-statList-stat'>
              <i className='fas fa-battery-full'/>
              <p className='shopitemListItem__body-itemInfoContainer-statList-stat-value'>{battery}</p>
            </div>
            <div className='shopitemListItem__body-itemInfoContainer-statList-stat'>
              <i className='fas fa-fist-raised'/>
              <p className='shopitemListItem__body-itemInfoContainer-statList-stat-value'>{rage}</p>
            </div>
            <div className='shopitemListItem__body-itemInfoContainer-statList-stat'>
              <i className='fas fa-shield-alt'/>
              <p className='shopitemListItem__body-itemInfoContainer-statList-stat-value'>{shield}</p>
            </div>
          </div>
        </div>
        <CustomButton disabled={gears < price} blue onClick={() => dispatch(openModal({modalName: 'TransactionModal', modalPayload: {...item, quantity: 1}}))}>
          <i className='fas fa-cog'/>
          {price}
        </CustomButton>
      </div>
    </div>
  );
}