import React from 'react';

import NAVIGATION_DATA from './dropdown-navigation.data';

import DropdownNavigationItem from '../dropdown-navigation-item/dropdown-navigation-item.component';

import './dropdown-navigation.styles.scss';

export default function DropdownNavigation() {
  return(
    <nav className="dropdownNavigation">
      <ul className="dropdownNavigation__list">
        {NAVIGATION_DATA.map((navItem) => <DropdownNavigationItem key={navItem.linkName} {...navItem}/>)}
      </ul>
    </nav>
  );
}