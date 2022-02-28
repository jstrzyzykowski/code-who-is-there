import React from 'react';

import {useSelector} from 'react-redux';

import Avatar from '../common/avatar/avatar.component';

import './dropdown-user.styles.scss';

export default function DropdownUser() {
  const {nickname, comment, emiter: {avatarUrl}} = useSelector((state) => state.user.currentUser);

  return(
    <div className='dropdownUserWrapper'>
      <Avatar imageURL={avatarUrl} size={80} circle/>
      <div className="dropdownUserWrapper__info">
        <div className='dropdownUserWrapper__info-header'>
          <p className="dropdownUserWrapper__info-header-nickname">{nickname}</p>
        </div>
        <p className="dropdownUserWrapper__info-comment">{comment}</p>
      </div>
    </div>
  );
}