import React from 'react';

import UserListItem from '../user-list-item/user-list-item.component';

import './user-list.styles.scss';

export default function UserList({users, withRank}) {

  return (
    <div className='userList'>
      {users.sort((a, b) => b.emiter.gears - a.emiter.gears).map((user, index) => <UserListItem key={user.id} {...user} rank={withRank ? index + 1 : false}/>)}
    </div>
  );
}