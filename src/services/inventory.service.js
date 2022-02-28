import {database} from '../firebase/firebase.utils';

class InventoryDataService {
  addItemToUserInventory(currentUser, item) {
    const {id, displayName, price, imageUrl, type, statistics, quantity} = item;
    const sameItemFromInventory = currentUser.inventory.find((inventoryItem) => inventoryItem.id === id);

    const newInventoryItem = { displayName, price, imageUrl, type, statistics, quantity };

    if(!sameItemFromInventory) {
      return database.ref(`/users/${currentUser.id}/inventory/${item.id}`).set({
        ...newInventoryItem,
      });
    } else {
      return database.ref(`/users/${currentUser.id}/inventory/${item.id}`).update({
        quantity: sameItemFromInventory.quantity + item.quantity,
      });
    }
  }

  async getUserInventory(userId) {
    const snapshot = await database.ref(`/users/${userId}/inventory`).get();
    const data = snapshot.val();
    let result = [];
    for(const key in data) {
      result.push({
        id: key,
        ...data[key]
      });
    }
    return result;
  }
}

export default new InventoryDataService();