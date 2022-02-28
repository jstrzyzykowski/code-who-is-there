import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../redux/modal/modal.actions';

import UsersDataService from '../../../services/users.service';

import FormInput from '../../common/form-input/form-input.component';
import CustomButton from '../../common/custom-button/custom-button.component';
import SectionHeader from '../../section-header/section-header.component';
import FormTextarea from '../../common/form-textarea/form-textarea.component';

import './settings-profile-form.styles.scss';

export default function SettingsProfileForm() {
  const {id, email, name, surname, nickname, comment} = useSelector((state) => state.user.currentUser);
  const [profileData, setProfileData] = useState({
    name,
    surname,
    nickname,
    comment,
  });
  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const {name, value} = event.target;

    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const hasNameChanged = profileData.name !== name;
    const hasSurnameChanged = profileData.surname !== surname;
    const hasNicknameChanged = profileData.nickname !== nickname;
    const hasUserCommentChanged = profileData.comment !== comment;

    if (hasNameChanged || hasSurnameChanged || hasNicknameChanged || hasUserCommentChanged) {
      try {
        await UsersDataService.updateOneUser(id, profileData);
        dispatch(openModal({modalName: 'MessageModal', modalPayload: {type: 'success', message: 'Super! Dane Twojego konta zostały pomyślnie zaktualizowane.'}}))
      } catch (error) {
        dispatch(openModal({modalName: 'MessageModal', modalPayload: {type: 'error', message: `Błąd[${error.code}] Coś poszło nie tak. Skontaktuj się z administratorem.`}}));
      }
    } else {
      dispatch(openModal({modalName: 'MessageModal', modalPayload: {type: 'info', message: 'Wszystko wygląda na aktualne... Zmień coś i dopiero wykonaj aktualizację.'}}));
    }
  };

  return (
    <form onSubmit={handleSubmit} className='settingsProfileForm'>
      <div className='settingsProfileForm__inputsContainer'>
        <SectionHeader>Sekretne dane</SectionHeader>
        <FormInput
          value={id}
          type="text"
          disabled
          label="fas fa-lock"
        />
        <FormInput
          value={email}
          type="text"
          disabled
          label="fas fa-lock"
        />
        <SectionHeader>Informacje użytkownika</SectionHeader>
        {/* Set min and max chars */}
        <FormInput
          name="name"
          type="text"
          value={profileData.name}
          handleChange={handleChange}
          required
          label="fas fa-address-card"
          placeholder='Imię'
          minLength="3"
          maxLength="15"
        />
        <FormInput
          name="surname"
          type="text"
          value={profileData.surname}
          handleChange={handleChange}
          required
          label="fas fa-address-card"
          placeholder='Nazwisko'
          minLength="3"
          maxLength="20"
        />
        {/* Set min and max chars */}
        <FormInput
          name="nickname"
          type="text"
          value={profileData.nickname}
          handleChange={handleChange}
          required
          label="fas fa-user-secret"
          placeholder='Nickname'
          minLength="3"
          maxLength="20"
          pattern="[A-Za-z0-9_ ]{3,20}"
        />
        <SectionHeader>Ustaw komentarz</SectionHeader>
        <FormTextarea
          rows={3}
          name="comment"
          value={profileData.comment}
          handleChange={handleChange}
          required
          maxLength="100"
        />
      </div>
      <div className='settingsProfileForm__buttonsContainer'>
        <CustomButton type="submit" blue fluid>
          Potwierdź
        </CustomButton>
        <CustomButton type="button" fluid onClick={() => history.push('/app/settings')}>
          Wstecz
        </CustomButton>
      </div>
    </form>
  );
}