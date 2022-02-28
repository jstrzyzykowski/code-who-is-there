import React from 'react';

import { useDispatch } from 'react-redux';
import {closeModal} from '../redux/modal/modal.actions';

import './modal-wrapper.styles.scss';

export default function ModalWrapper({children, title}) {
  const dispatch = useDispatch();

  return (
    <div className='overlay'>
      <div className='modalWrapper'>
        <div className='modalWrapper__header'>
          <p className='modalWrapper__header-title'>{title}</p>
          <div className='modalWrapper__header-closeModalButton' onClick={() => dispatch(closeModal())}>
            <i className='fas fa-times'/>
          </div>
        </div>
        <div className='modalWrapper__content'>
          {children}
        </div>
      </div>
    </div>
  );
}