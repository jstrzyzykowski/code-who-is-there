import firebase from "firebase/compat/app";
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const config = "YOUR_FIREBASE_CONFIG_HERE";

export const createUserProfile = async (userAuth) => {
  if(!userAuth) return;

  const userRef = database.ref(`/users/${userAuth.uid}`);
  const userSnap = await userRef.get();

  if(!userSnap.exists()) {
    const { email } = userAuth;
    const createdTimestamp = new Date().getTime();
    const avatarNumber = Math.floor(Math.random() * 17) + 1;
    const storageRef = storage.ref(`/avatars/${avatarNumber}.jpg`);
    const avatarUrl = await storageRef.getDownloadURL();
    const emiterCode = userAuth.uid.slice(0, 6);

    try {
      await userRef.set({
        name: 'Emiter',
        surname: emiterCode,
        nickname: `Emiter-${emiterCode}`,
        email,
        createdTimestamp,
        comment: 'Cześć! Jestem tu nowy',
        emiter: {
          avatarNumber,
          avatarUrl,
          gears: 0,
          battlesWin: 0,
          battlesLose: 0,
          battlesDraw: 0,
        },
        emiterSession: {
          lastTestAt: false,
          //BETA 1
          rewardsNumber: 1,
          sessionStartAt: false,
          testStatus: false,
          isInPlace: false,
        },
      });
    } catch(error) {
      console.log('Error while creating user!', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();

export default firebase;

