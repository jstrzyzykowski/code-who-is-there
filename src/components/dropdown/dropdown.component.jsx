import React from 'react';

import { useSelector } from 'react-redux';

import DropdownUser from '../dropdown-user/dropdown-user.component';
import DropdownNavigation from '../dropdown-navigation/dropdown-navigation.component';

import './dropdown.styles.scss';

export default function Dropdown() {
  const {isActive} = useSelector((state) => state.menu);

  return (
    <div className={`dropdown ${isActive ? 'active' : ''}`}>
      <DropdownUser/>
      <DropdownNavigation/>
    </div>
  );
}