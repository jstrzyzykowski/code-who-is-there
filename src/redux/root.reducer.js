import {combineReducers} from 'redux';

import menuReducer from './menu/menu.reducer';
import userReducer from './user/user.reducer';
import itemReducer from './item/item.reducer';
import modalReducer from './modal/modal.reducer';
import statisticReducer from './statistic/statistic.reducer';
import emiterReducer from './emiter/emiter.reducer';

const rootReducer = combineReducers({
  menu: menuReducer,
  user: userReducer,
  item: itemReducer,
  modal: modalReducer,
  statistic: statisticReducer,
  emiter: emiterReducer,
});

export default rootReducer;