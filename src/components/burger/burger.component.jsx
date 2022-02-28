import React from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {toggleMenu} from '../../redux/menu/menu.actions';

import './burger.styles.scss';

export default function Burger() {
  const {isActive} = useSelector((state) => state.menu);
  const dispatch = useDispatch();

  return (
    <button className={`burger ${isActive ? 'active' : ''}`}  onClick={() => dispatch(toggleMenu())}>
      <div className="burger__layer"/>
      <div className="burger__layer"/>
      <div className="burger__layer"/>
    </button>
  );
}