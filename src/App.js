import React, {useEffect} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux';
import {
  checkCurrentUserAuthEnd,
  checkCurrentUserAuthStart,
  synchronizeCurrentUserData,
} from './redux/user/user.actions';

import {createStructuredSelector} from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';

import { auth, createUserProfile } from './firebase/firebase.utils';

import WelcomePage from './pages/welcome/welcome.component';
import SignInSignUpPage from './pages/welcome/sign-in-sign-up/sign-in-sign-up.component';
import AppControllerPage from './pages/app/app.component';
import ModalManager from './modal/modal-manager.component';
import Snow from './components/common/snow/snow.component';

import './App.scss';

function App() {
  const { currentUser } = useSelector(createStructuredSelector({
    currentUser: selectCurrentUser,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    let userRef = null;
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      dispatch(checkCurrentUserAuthStart());
      if(userAuth) {
        userRef = await createUserProfile(userAuth);
        userRef.on('value', (snapshot) => {
          const currentUser = snapshot.val();
          let inventory = [];
          let battlesCooldowns = [];
          if(currentUser.inventory) {
            for (const key in currentUser.inventory) {
              inventory.push({
                id: key,
                ...currentUser.inventory[key],
              });
            }
          }

          if(currentUser.battlesCooldowns) {
            for (const key in currentUser.battlesCooldowns) {
              battlesCooldowns.push({
                enemyId: key,
                lastAttackAt: currentUser.battlesCooldowns[key].lastAttackAt,
              });
            }
          }

          const user = {
            id: snapshot.key,
            ...currentUser,
            inventory,
            battlesCooldowns,
          };

          dispatch(synchronizeCurrentUserData(user));
        })
      } else {
        dispatch(synchronizeCurrentUserData(userAuth));
      }

      dispatch(checkCurrentUserAuthEnd());
    })

    return () => {
      if(userRef) userRef.off();
      unsubscribeFromAuth();
    };
  }, [dispatch]);

  //@TODO: Here will be Modal with 'Auth checking...' info
  return (
    <>
      <ModalManager/>
      <div className="app">
        <Snow/>
        <Switch>
          <Route exact path="/welcome" render={() => currentUser ? <Redirect to='/app'/> : <WelcomePage/>} />
          <Route exact path="/welcome/:operation" render={() => currentUser ? <Redirect to='/app'/> : <SignInSignUpPage/>} />
          <Route path="/app" render={() => currentUser ? <AppControllerPage/> : <Redirect to='/welcome'/>} />
          <Route render={() => <Redirect to="/welcome"/>}/>
        </Switch>
      </div>
    </>
  );
}

export default App;
