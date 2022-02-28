import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { openModal } from '../../../redux/modal/modal.actions';

import { auth, createUserProfile } from '../../../firebase/firebase.utils';

import FormInput from '../../common/form-input/form-input.component';
import CustomButton from '../../common/custom-button/custom-button.component';

import './sign-up-form.styles.scss';

export default function SignUpForm() {
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    passwordRepeat: '',
  });
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const {name, value} = event.target;

    setRegisterData({
      ...registerData,
      [name]: value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {email, password, passwordRepeat} = registerData;

    if(password !== passwordRepeat) {
      dispatch(openModal({modalName: 'MessageModal', modalPayload: {type: 'error', message: "Wygląda na to, że wprowadziłeś różne hasła. Sprawdź to dokładnie i spróbuj ponownie."}}));
      return;
    }

    // Start loader
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      await createUserProfile(user);
    } catch(error) {
      let message = `Błąd[${error.code}] Sprawdź wszystko dokładnie - jeśli błąd będzie się powtarzał, skontaktuj się z administratorem.`;
      if(error.code === 'auth/email-already-in-use') message = "Ten adres email jest już zajęty! Użyj innego adresu i spróbuj ponownie.";
      dispatch(openModal({modalName: 'MessageModal', modalPayload: {type: 'error', message}}));
    }
    // End Loader
  }

  return (
    <form className='signUpForm' onSubmit={handleSubmit}>
      <FormInput
        name="email"
        value={registerData.email}
        handleChange={handleChange}
        type="email"
        required
        label="fas fa-envelope"
        placeholder='Email'
      />
      <FormInput
        name="password"
        value={registerData.password}
        handleChange={handleChange}
        type="password"
        required
        label="fas fa-key"
        placeholder='Hasło'
      />
      <FormInput
        name="passwordRepeat"
        value={registerData.passwordRepeat}
        handleChange={handleChange}
        type="password"
        required
        label="fas fa-key"
        placeholder='Powtórz hasło'
      />
      <CustomButton type="submit" fluid blue>Potwierdź rejestrację!</CustomButton>
    </form>
  );
}