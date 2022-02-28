import modalTypes from './modal.types';

export const openModal = (payload) => {
  return {
    type: modalTypes.OPEN_MODAL,
    payload,
  }
};

export const closeModal = () => {
  return {
    type: modalTypes.CLOSE_MODAL,
  }
}