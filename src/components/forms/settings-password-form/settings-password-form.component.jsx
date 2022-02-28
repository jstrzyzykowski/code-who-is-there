import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../redux/modal/modal.actions';

import {auth} from '../../../firebase/firebase.utils';

import FormInput from '../../common/form-input/form-input.component';
import CustomButton from '../../common/custom-button/custom-button.component';
import SectionHeader from '../../section-header/section-header.component';

import './settings-password-form.styles.scss';

export default function SettingsPasswordForm() {
  const {email} = useSelector((state) => state.user.currentUser);
  const [passwordData, setPasswordData] = useState({
    previousPassword: '',
    newPassword: '',
    newPasswordRepeat: '',
  });
  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const {name, value} = event.target;

    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {previousPassword, newPassword, newPasswordRepeat} = passwordData;

    if(newPassword === newPasswordRepeat && previousPassword !== newPassword) {
      try {
        await auth.signInWithEmailAndPassword(email, previousPassword);
        await auth.currentUser.updatePassword(newPassword);

        setPasswordData({
          previousPassword: '',
          newPassword: '',
          newPasswordRepeat: '',
        })
        dispatch(openModal({modalName: 'MessageModal', modalPayload: {type: 'success', message: 'Twoje hasło zostało pomyślnie zmienione! Pamiętaj aby je zapisać.'}}));
      } catch(error) {
        dispatch(openModal({modalName: 'MessageModal', modalPayload: {type: 'error', message: `Błąd[${error.code}] Nieprawidłowe dane - sprawdź wszystko dokładnie i spróbuj ponownie.`}}));
      }
    } else {
      dispatch(openModal({modalName: 'MessageModal', modalPayload: {type: 'error', message: 'Hasła nieprawidłowe. Sprawdź wszystko dokładnie i spróbuj ponownie.'}}));
    }
  }

  return (
    <form onSubmit={handleSubmit} className='settingsPasswordForm'>
      {/* Set min and max chars */}
      <div className='settingsPasswordForm__inputsContainer'>
        <SectionHeader>Zmień hasło</SectionHeader>
        <FormInput
          name='previousPassword'
          type='password'
          label='fas fa-key'
          placeholder='Stare hasło'
          required
          value={passwordData.previousPassword}
          handleChange={handleChange}
        />
        {/* Set min and max chars */}
        <FormInput
          name='newPassword'
          type='password'
          label='fas fa-key'
          placeholder='Nowe hasło'
          required
          value={passwordData.newPassword}
          handleChange={handleChange}
        />
        {/* Set min and max chars */}
        <FormInput
          name='newPasswordRepeat'
          type='password'
          label='fas fa-key'
          placeholder='Powtórz nowe hasło'
          required
          value={passwordData.newPasswordRepeat}
          handleChange={handleChange}
        />
      </div>
      <div className='settingsPasswordForm__buttonsContainer'>
        <CustomButton type='submit' fluid blue>Potwierdź</CustomButton>
        <CustomButton type="button" fluid onClick={() => history.push('/app/settings')}>
          Wstecz
        </CustomButton>
      </div>
    </form>
  );
}