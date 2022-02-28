import itemTypes from './item.types';

const INITIAL_STATE = {
  items: [],
  isFetching: false,
  errorMessage: undefined,
};

export default function itemReducer(state = INITIAL_STATE, {type, payload}) {
  switch (type) {
    case itemTypes.FETCH_ITEMS_START:
      return {
        ...state,
        isFetching: true,
      };
    case itemTypes.FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        items: payload,
        isFetching: false,
        errorMessage: undefined,
      }
    case itemTypes.FETCH_ITEMS_FAILURE:
      return {
        ...state,
        errorMessage: payload,
      }
    default:
      return state;
  }
}