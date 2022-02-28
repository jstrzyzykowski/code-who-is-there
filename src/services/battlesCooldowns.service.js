import {database} from '../firebase/firebase.utils';

class BattlesCooldownsDataService {
  setBattleCooldownOnUser(userId, enemyId) {
    return database.ref(`/users/${userId}/battlesCooldowns/${enemyId}`).update({
      lastAttackAt: new Date().getTime(),
    });
  }
}

export default new BattlesCooldownsDataService();