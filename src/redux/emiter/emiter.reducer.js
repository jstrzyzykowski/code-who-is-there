import emiterTypes from './emiter.types';

const INITIAL_STATE = {
  calibrate: {
    calibrateInProgress: false,
    isCalibrated: false,
    error: undefined,
  },
};

export default function emiterReducer(state = INITIAL_STATE, {type, payload}) {
  switch (type) {
    case emiterTypes.CALIBRATE_START:
      return {
        ...state,
        calibrate: {
          ...state.calibrate,
          calibrateInProgress: true,
        },
      };
    case emiterTypes.CALIBRATE_SUCCESS:
      return {
        ...state,
        calibrate: {
          ...state.calibrate,
          calibrateInProgress: false,
          isCalibrated: true,
          error: undefined,
        },
      };
    case emiterTypes.CALIBRATE_FAILURE:
      return {
        ...state,
        calibrate: {
          ...state.calibrate,
          calibrateInProgress: false,
          isCalibrated: false,
          error: undefined,
        },
      };
    case emiterTypes.CALIBRATE_ERROR:
      return {
        ...state,
        calibrate: {
          ...state.calibrate,
          calibrateInProgress: false,
          isCalibrated: false,
          error: payload,
        },
      };
    default:
      return state;
  }
};