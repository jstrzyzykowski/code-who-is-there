import modalTypes from './modal.types';

const INITIAL_STATE = {
  modalName: null,
  modalPayload: null,
};

export default function modalReducer(state = INITIAL_STATE, {type, payload}) {
  switch (type) {
    case modalTypes.OPEN_MODAL:
      const {modalName, modalPayload} = payload;
      return {
        ...state,
        modalName,
        modalPayload,
      }
    case modalTypes.CLOSE_MODAL:
      return {
        ...state,
        modalName: null,
        modalPayload: null,
      }
    default:
      return state;
  }
}