import {database} from '../firebase/firebase.utils';

class EmiterSessionDataService {
  decreaseUserRewardsNumber(currentUser) {
    return database.ref(`/users/${currentUser.id}/emiterSession`).update({
      rewardsNumber: currentUser.emiterSession.rewardsNumber - 1,
    });
  }
}

export default new EmiterSessionDataService();