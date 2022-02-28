import userTypes from './user.types';

// Check is 'error' property necessary?
const INITIAL_STATE = {
  currentUser: null,
  users: [],
  error: undefined,
  isCurrentUserFetching: false,
  errorMessage: undefined,
  isUserAuthChecking: false,
};

export default function userReducer(state = INITIAL_STATE, {type, payload}) {
  switch (type) {
    case userTypes.FETCH_CURRENT_USER_START:
      return {
        ...state,
        isCurrentUserFetching: true,
      };
    case userTypes.FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state,
        isCurrentUserFetching: false,
        errorMessage: undefined,
      };
    case userTypes.FETCH_CURRENT_USER_FAILURE:
      return {
        ...state,
        isCurrentUserFetching: false,
        errorMessage: payload,
      }
    case userTypes.CHECK_CURRENT_USER_AUTH_START:
      return {
        ...state,
        isUserAuthChecking: true,
      }
    case userTypes.CHECK_CURRENT_USER_AUTH_END:
      return {
        ...state,
        isUserAuthChecking: false,
      }
    case userTypes.SYNCHRONIZE_CURRENT_USER_DATA:
      return {
        ...state,
        currentUser: payload,
        isUserAuthChecking: false,
      };
    case userTypes.SYNCHRONIZE_USERS_DATA:
      return {
        ...state,
        users: payload,
      };
    default:
      return state;
  }
}