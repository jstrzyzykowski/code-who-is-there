import menuTypes from './menu.types';

const INITIAL_STATE = {
  isActive: false,
}

export default function menuReducer(state = INITIAL_STATE, {type, payload}) {
  switch (type) {
    case menuTypes.TOGGLE_MENU:
      return { isActive: !state.isActive };
    case menuTypes.SHOW_MENU:
      return { isActive: true };
    case menuTypes.HIDE_MENU:
      return { isActive: false };
    default:
      return state;
  }
}