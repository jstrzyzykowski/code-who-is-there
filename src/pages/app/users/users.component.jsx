import React from 'react';

import { useSelector } from 'react-redux';

import UserList from '../../../components/user-list/user-list.component';

import './users.styles.scss';

export default function UsersPage() {
  const {users} = useSelector((state) => state.user);

  return (
    <div className='usersPage'>
      <UserList users={users} withRank={true}/>
    </div>
  );
}