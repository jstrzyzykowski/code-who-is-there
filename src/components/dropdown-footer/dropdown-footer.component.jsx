import React from 'react';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { hideMenu } from '../../redux/menu/menu.actions';

import { auth } from '../../firebase/firebase.utils';
import { handleComplete } from '../../pages/app/switcher/switcher.data';

import CustomButton from '../common/custom-button/custom-button.component';

import './dropdown-footer.styles.scss';

export default function DropdownFooter() {
  const {currentUser} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = async () => {
    await handleComplete(currentUser);
    dispatch(hideMenu());
    await auth.signOut();
    history.push('/');
  }

  return (
    <div className='dropdownFooter'>
      <CustomButton fluid onClick={handleLogout}>
        <i className="fas fa-door-open"/>
        Logout
      </CustomButton>
    </div>
  );
}