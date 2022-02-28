import { database } from '../../../firebase/firebase.utils';

// Normal is 45min
// BETA 15min
export const CALIBRATE_TIME_MS = 15 * 60 * 1000;
// Normal is 1h
// BETA 10min
export const SESSION_TIME_MS = 10 * 60 * 1000;

export const handleComplete = async (currentUser) => {
  try {
    await database.ref(`/users/${currentUser.id}/emiterSession`).update({
      isInPlace: false,
      testStatus: false,
      lastTestAt: false,
      sessionStartAt: false,
    });
  } catch(error) {
    console.log(error.message);
  }
}

export const increaseUserRewardCount = async (currentUser) => {
  const timestamp = new Date().getTime();
  const rewards = currentUser.emiterSession.rewardsNumber + 1;

  try {
    await database.ref(`/users/${currentUser.id}/emiterSession`).update({
      rewardsNumber: rewards,
      sessionStartAt: timestamp,
    })
  } catch(error) {
    console.error('Error! Something goes wrong with increase user reward number.');
  }
}