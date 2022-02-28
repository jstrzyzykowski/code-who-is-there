import React from 'react';
import {Route, Switch, useHistory, useParams} from 'react-router-dom';

import SignInForm from '../../../components/forms/sign-in-form/sign-in-form.component';
import SignUpForm from '../../../components/forms/sign-up-form/sign-up-form.component';

import CustomIconButton from '../../../components/common/custom-icon-button/custom-icon-button.component';

import './sign-in-sign-up.styles.scss';

export default function SignInSignUpPage() {
  const history = useHistory();
  const params = useParams();
  const { operation } = params;

  return (
    <div className='signInSignUpPage'>
      <CustomIconButton iconClassName='fas fa-chevron-left' handler={() => history.push('/welcome')}/>
      <div className='signInSignUpPage__header'>
        <p className='signInSignUpPage__header-text'>
          {operation === 'sign-in' ? 'Znowu się spotykamy!' : 'Potrzebujemy Cię w naszym składzie!'}
        </p>
      </div>
      <Switch>
        <Route exact path='/welcome/sign-in' component={SignInForm} />
        <Route exact path='/welcome/sign-up' component={SignUpForm} />
      </Switch>
    </div>
  );
}