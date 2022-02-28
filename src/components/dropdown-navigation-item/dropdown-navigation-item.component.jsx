import React from 'react';
import {NavLink, useHistory} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {hideMenu} from '../../redux/menu/menu.actions';

import './dropdown-navigation-item.styles.scss';

export default function DropdownNavigationItem({linkName, iconClassName, displayName, description}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const {isInPlace} = useSelector((state) => state.user.currentUser.emiterSession);

  return (
    <li className="dropdownNavigationItem">
      <NavLink className="dropdownNavigationItem__link" to={`/app/${linkName}`} onClick={() => {
        dispatch(hideMenu());
        history.push(`/app/${linkName}`);
      }}>
        <i className={iconClassName}/>
        <div className='dropdownNavigationItem__link-text'>
          <p className='dropdownNavigationItem__link-text-title'>{displayName}</p>
          <p className='dropdownNavigationItem__link-text-description'>{description}</p>
        </div>
        {linkName === 'switcher' && (<p className={`label-switcher ${isInPlace ? 'active' : ''}`}>{isInPlace ? 'active' : 'offline'}</p>)}
      </NavLink>
    </li>
  );
}