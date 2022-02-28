import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../redux/modal/modal.actions';

import { auth } from '../../../firebase/firebase.utils';

import FormInput from '../../common/form-input/form-input.component';
import CustomButton from '../../common/custom-button/custom-button.component';

import './sign-in-form.styles.scss';
import { fetchCurrentUserStartAsync } from '../../../redux/user/user.actions';
import { createStructuredSelector } from 'reselect';

export default function SignInForm() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const {isCurrentUserFetching, errorMessage} = useSelector(state => state.user);

  const handleChange = (event) => {
    const {name, value} = event.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // const {email, password} = loginData;

    dispatch(fetchCurrentUserStartAsync(loginData));

    // try {
    //   await auth.signInWithEmailAndPassword(email, password);
    // } catch(error) {
    //   let message = 'Nieprawidłowe dane - jeśli błąd będzie się powtarzał, skontaktuj się z administratorem.';
    //   if(error.code === 'auth/user-not-found') message = 'Konto o podanym adresie email nie istnieje. Sprawdź wprowadzone dane i spróbuj ponownie lub utwórz nowe konto!';
    //   dispatch(openModal({modalName: 'MessageModal', modalPayload: {type: 'error', message}}));
    // }
  }

  return (
    <form className='signInForm' onSubmit={handleSubmit}>
      <FormInput
        name="email"
        value={loginData.email}
        handleChange={handleChange}
        type="email"
        required
        label="fas fa-envelope"
        placeholder='Email'
      />
      <FormInput
        name="password"
        value={loginData.password}
        handleChange={handleChange}
        type="password"
        required
        label="fas fa-key"
        placeholder='Hasło'
      />
      <CustomButton type="submit" fluid blue loader={isCurrentUserFetching}>Wchodzę!</CustomButton>
    </form>
  );
}