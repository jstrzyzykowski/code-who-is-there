import {database} from '../firebase/firebase.utils';

class EmiterDataService {
  addGearsToUser(currentUser, gearAmount) {
      return database.ref(`/users/${currentUser.id}/emiter`).update({
      gears: currentUser.emiter.gears + gearAmount,
    });
  }

  payForShopItem(currentUser, priceInGears) {
    return database.ref(`/users/${currentUser.id}/emiter`).update({
      gears: currentUser.emiter.gears - priceInGears,
    });
  }

  addGearsToEnemy(enemyId, enemyCurrGears, gearsToAdd) {
    return database.ref(`/users/${enemyId}/emiter`).update({
      gears: enemyCurrGears + gearsToAdd,
    });
  }

  async updateEmiterBattleStat(userId, battleStatName) {
    const result = await database.ref(`/users/${userId}/emiter/${battleStatName}`).get();
    const currentStatValue = result.val();
    return database.ref(`/users/${userId}/emiter/${battleStatName}`).set(currentStatValue + 1);
  }

}

export default new EmiterDataService();