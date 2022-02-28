import React from 'react';
import { useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { auth } from '../../firebase/firebase.utils';
import { handleComplete } from '../../pages/app/switcher/switcher.data';

import Burger from '../burger/burger.component';
import Statisticker from '../common/statisticker/statisticker.component';
import CustomIconButton from '../common/custom-icon-button/custom-icon-button.component';

import './toolbar.styles.scss';

export default function Toolbar() {
  const {gears} = useSelector((state) => state.user.currentUser.emiter);
  const { currentUser } = useSelector(createStructuredSelector({
    currentUser: selectCurrentUser,
  }));
  const history = useHistory();

  const handleLogout = async () => {
    await handleComplete(currentUser);
    await auth.signOut();
    history.push('/');
  };

  return (
    <div className='toolbar'>
      <Burger />
      <div className='toolbar__informators'>
        <Statisticker value={gears} iconClassName='fas fa-cog'/>
        <CustomIconButton iconClassName='fas fa-door-open' handler={handleLogout}/>
      </div>
    </div>
  );
}