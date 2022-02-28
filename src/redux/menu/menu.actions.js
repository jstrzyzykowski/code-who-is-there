import menuTypes from './menu.types';

export function toggleMenu() {
  return {
    type: menuTypes.TOGGLE_MENU,
  }
}

export function showMenu() {
  return {
    type: menuTypes.SHOW_MENU,
  }
}

export function hideMenu() {
  return {
    type: menuTypes.HIDE_MENU,
  }
}