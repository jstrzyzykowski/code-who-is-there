import React, {useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { synchronizeUsersData } from '../../redux/user/user.actions';
import { fetchItemsStartAsync } from '../../redux/item/item.actions';

import { database } from '../../firebase/firebase.utils';
import { CALIBRATE_TIME_MS, handleComplete, increaseUserRewardCount, SESSION_TIME_MS } from './switcher/switcher.data';

import Toolbar from '../../components/toolbar/toolbar.component';
import Dropdown from '../../components/dropdown/dropdown.component';

import HomePage from './home/home.component';
import SettingsPage from './settings/settings.component';
import SettingsOptionPage from './settings/settings-option/settings-option.component';
import SwitcherPage from './switcher/switcher.component';
import ProfilePage from './profile/profile.component';
import UsersPage from './users/users.component';
import ShopPage from './shop/shop.component';
import InventoryPage from './inventory/inventory.component';

import './app.styles.scss';
import { openModal } from '../../redux/modal/modal.actions';

export default function AppPage() {
  const dispatch = useDispatch();
  const {isActive} = useSelector((state) => state.menu);
  const currentUser = useSelector((state) => state.user.currentUser);
  const {lastTestAt, sessionStartAt} = useSelector((state) => state.user.currentUser.emiterSession);

  useEffect(() => {
    let users = [];
    const usersRef = database.ref('/users');
    const unsubscribeFromUsersDataChange = usersRef.on('value', (snapshot) => {
      if(snapshot.val() !== null) {
        snapshot.forEach((childSnapshot) => {
          const user = childSnapshot.val();
          users.push({
            id: childSnapshot.key,
            emiter: {
              avatarUrl: user.emiter.avatarUrl,
              gears: user.emiter.gears,
              avatarNumber: user.emiter.avatarNumber,
              battlesWin: user.emiter.battlesWin,
              battlesLose: user.emiter.battlesLose,
              battlesDraw: user.emiter.battlesDraw,
            },
            emiterSession: {
              isInPlace: user.emiterSession.isInPlace,
            },
            comment: user.comment,
            createdTimestamp: user.createdTimestamp,
            name: user.name,
            nickname: user.nickname,
            surname: user.surname,
          });
        })
        dispatch(synchronizeUsersData(users));
        users = [];
      } else {
        console.error('Error! There is no users in database.');
      }
    });

    return () => {
      usersRef.off('value', unsubscribeFromUsersDataChange);
      dispatch(synchronizeUsersData([]));
    };

  }, [dispatch]);

  useEffect(() => {
    let timeoutCleaner = null;

    if(currentUser.emiterSession.lastTestAt) {
      const fireTimeInMs = (currentUser.emiterSession.lastTestAt + CALIBRATE_TIME_MS) - new Date().getTime();

      timeoutCleaner = setTimeout(() => {
        handleComplete(currentUser);
      }, fireTimeInMs);
    }
    return () => {
      clearTimeout(timeoutCleaner);
    }
  }, [lastTestAt, currentUser])

  useEffect(() => {
    let cleaner = null;

    if(currentUser.emiterSession.sessionStartAt) {
      const fireTimeInMs = (currentUser.emiterSession.sessionStartAt + SESSION_TIME_MS) - new Date().getTime();

      cleaner = setTimeout(() => {
        increaseUserRewardCount(currentUser);
      }, fireTimeInMs);
    }

    return () => {
      clearTimeout(cleaner);
    };
  }, [sessionStartAt, currentUser]);

  useEffect(() => {
    dispatch(fetchItemsStartAsync());
  }, [dispatch]);

  return (
    <>
      <Dropdown/>
      <div className={`controllerPage ${isActive ? 'dropdownActive' : ''}`}>
        <Toolbar/>
        <div className="controllerPage__pageContainer">
          <Switch>
            <Route exact path="/app" render={() => <Redirect to="/app/home"/>} />
            <Route exact path="/app/home" component={HomePage}/>
            <Route exact path='/app/settings' component={SettingsPage} />
            <Route exact path='/app/settings/:option' component={SettingsOptionPage}/>
            <Route exact path='/app/switcher' component={SwitcherPage} />
            <Route exact path='/app/profile' component={ProfilePage} />
            <Route exact path='/app/inventory' component={InventoryPage} />
            <Route exact path='/app/users' component={UsersPage} />
            <Route exact path='/app/users/:userId' component={ProfilePage} />
            <Route exact path='/app/shop' component={ShopPage}/>
            <Route render={() => <Redirect to="/app"/>} />
          </Switch>
        </div>
      </div>
    </>
  );
}