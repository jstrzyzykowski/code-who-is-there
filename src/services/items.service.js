import {database} from '../firebase/firebase.utils';

class ItemsDataService {
  async getOneItemData(itemId) {
    const itemSnapshot = await database.ref(`/items/${itemId}`).get();
    return {
      id: itemSnapshot.key,
      ...itemSnapshot.val(),
    };
  }
}

export default new ItemsDataService();