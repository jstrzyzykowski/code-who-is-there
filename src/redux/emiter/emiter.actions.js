import SPAWNER from '../../data/spawner.data';

import { database } from '../../firebase/firebase.utils';
import { checkCoordinates } from './emiter.utils';

import { openModal } from '../modal/modal.actions';
import emiterTypes from './emiter.types';

export const calibrateStart = () => {
  return {
    type: emiterTypes.CALIBRATE_START,
  };
};

export const calibrateSuccess = () => {
  return {
    type: emiterTypes.CALIBRATE_SUCCESS,
  }
};

export const calibrateFailure = () => {
  return {
    type: emiterTypes.CALIBRATE_FAILURE,
  }
}

export const calibrateError = (errorMessage) => {
  return {
    type: emiterTypes.CALIBRATE_ERROR,
    payload: errorMessage,
  }
}

export const calibrateStartAsync = (currentUser) => {
  return async (dispatch) => {
    dispatch(calibrateStart());
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = parseFloat(position.coords.latitude.toFixed(4));
        const longitude = parseFloat(position.coords.longitude.toFixed(4));

        //BETA
        // const isUserOnSpawner = checkCoordinates(latitude, longitude);
        const isUserOnSpawner = true;

        if(isUserOnSpawner) {
          const timestamp = new Date().getTime();
          await database.ref(`/users/${currentUser.id}/emiterSession`).update({
            testStatus: true,
            lastTestAt: timestamp,
          });
          dispatch(calibrateSuccess());
        } else {
          await database.ref(`/users/${currentUser.id}/emiterSession`).update({
            ...currentUser.emiterSession,
            isInPlace: false,
            testStatus: false,
            lastTestAt: false,
          });
          dispatch(calibrateFailure());
          //TODO: Here is not necessary to show spawner position because now position is an area, not a point
          dispatch(openModal({modalName: 'MessageModal', modalPayload: {type: 'info', message: `Twoja pozycja [${latitude}, ${longitude}] różni się od pozycji spawnera [${SPAWNER.latitude}, ${SPAWNER.longitude}].`}}));
        }
      }, (error) => {
        console.error("Error Code = " + error.code + " - " + error.message);
      }, { enableHighAccuracy: true});
    } catch(error) {
      dispatch(calibrateError(error.message));
      dispatch(openModal({modalName: 'MessageModal', modalPayload: {type: 'error', message: `To wygląda na awarię urządzenia kalibrującego! Poczekaj chwilę i spróbuj ponownie.`}}));
    }
  };
};

