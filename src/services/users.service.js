import {database} from '../firebase/firebase.utils';

class UsersDataService {
  getUsers() {
    return database.ref('/users');
  }

  getOneUser(userId) {
    return database.ref(`/users/${userId}`);
  }

  updateOneUser(userId, value) {
    return database.ref(`/users/${userId}`).update(value);
  }

  createUser(userId, value) {
    return database.ref(`/users/${userId}`).set(value);
  }
}

export default new UsersDataService();
