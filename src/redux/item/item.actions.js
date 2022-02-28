import itemTypes from './item.types';
import { database } from '../../firebase/firebase.utils';

export const setItems = (items) => {
  return {
    type: itemTypes.SET_ITEMS,
    payload: items,
  }
}

const fetchItemsStart = () => {
  return {
    type: itemTypes.FETCH_ITEMS_START,
  }
}

const fetchItemsSuccess = (items) => {
  return {
    type: itemTypes.FETCH_ITEMS_SUCCESS,
    payload: items,
  }
}

const fetchItemsFailure = (errorMessage) => {
  return {
    type: itemTypes.FETCH_ITEMS_FAILURE,
    payload: errorMessage,
  }
}

export const fetchItemsStartAsync = () => {
  return async (dispatch) => {
    dispatch(fetchItemsStart());
    try {
      const itemsSnap = await database.ref('items').get();
      const itemsData = itemsSnap.val();
      const items = [];
      for(const key in itemsData) {
        items.push({
          id: key,
          ...itemsData[key],
        })
      }
      dispatch(fetchItemsSuccess(items));
    } catch(err) {
      dispatch(fetchItemsFailure(err.message));
    }
  }
}