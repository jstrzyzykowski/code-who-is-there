import userTypes from './user.types';
import { auth } from '../../firebase/firebase.utils';
import { openModal } from '../modal/modal.actions';

export const synchronizeCurrentUserData = (user) => {
  return {
    type: userTypes.SYNCHRONIZE_CURRENT_USER_DATA,
    payload: user,
  };
};

export const synchronizeUsersData = (users) => {
  return {
    type: userTypes.SYNCHRONIZE_USERS_DATA,
    payload: users,
  };
};

export const checkCurrentUserAuthStart = () => {
  return {
    type: userTypes.CHECK_CURRENT_USER_AUTH_START,
  }
}

export const checkCurrentUserAuthEnd = () => {
  return {
    type: userTypes.CHECK_CURRENT_USER_AUTH_END,
  }
}


// ======================================================//
// ======================================================//

export const fetchCurrentUserStart = () => {
  return {
    type: userTypes.FETCH_CURRENT_USER_START,
  };
}

export const fetchCurrentUserSuccess = (currentUser) => {
  return {
    type: userTypes.FETCH_CURRENT_USER_SUCCESS,
    payload: currentUser,
  }
}

export const fetchCurrentUserFailure = (errorMessage) => {
  return {
    type: userTypes.FETCH_CURRENT_USER_FAILURE,
    payload: errorMessage,
  }
}

export const fetchCurrentUserStartAsync = ({email, password}) => {
  return async (dispatch) => {
    dispatch(fetchCurrentUserStart());
    try {
      await auth.signInWithEmailAndPassword(email, password);
      dispatch(fetchCurrentUserSuccess());
      // BETA
      dispatch(openModal({modalName: 'MessageModal', modalPayload: {type: 'success', message: 'Wielkie dzięki za udział w testach! Beta potrwa do 30.12.2021. Nagrody za ranking beta 31.12.2021.'}}))
    } catch (err) {
      let message = 'Nieprawidłowe dane - jeśli błąd będzie się powtarzał, skontaktuj się z administratorem.';
      if(err.code === 'auth/user-not-found') message = 'Konto o podanym adresie email nie istnieje. Sprawdź wprowadzone dane i spróbuj ponownie lub utwórz nowe konto!';
      dispatch(fetchCurrentUserFailure(err.code));
      dispatch(openModal({modalName: 'MessageModal', modalPayload: {type: 'error', message}}));
    }
  }
}