import React from 'react';
import {useHistory, useRouteMatch} from 'react-router-dom';

import CustomButton from '../../components/common/custom-button/custom-button.component';

import LogoTest2 from '../../assets/robots_test2.png';

import './welcome.styles.scss';
import { useSelector } from 'react-redux';

export default function WelcomePage() {
  const history = useHistory();
  const match = useRouteMatch();
  const {isUserAuthChecking} = useSelector(state => state.user);

  return (
    <div className='welcomePage'>
      <p className='welcomePage__appVersion'>Beta</p>
      <div className='welcomePage__header'>
        <p className='welcomePage__header-text'><span>Re</span> | Spawner</p>
        <p className='welcomePage__header-subText'>Zaloguj się lub stwórz nowe konto</p>
      </div>
      <div className='welcomePage__imageContainer'>
        <img src={LogoTest2} alt=""/>
      </div>
      <div className='welcomePage__buttonsContainer'>
        <CustomButton onClick={() => history.push(`${match.path}/sign-in`)} loader={isUserAuthChecking}>Logowanie</CustomButton>
        <CustomButton onClick={() => history.push(`${match.path}/sign-up`)} blue>Nie masz konta? <span>Zarejestruj się</span></CustomButton>
        <CustomButton reversed>Co, jak i dlaczego?</CustomButton>
      </div>
    </div>
  );
}