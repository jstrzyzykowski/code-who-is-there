import React, { useMemo } from 'react';

import { useSelector } from 'react-redux';

import Avatar from '../../../components/common/avatar/avatar.component';
import BattleStat from '../../../components/battle-stat/battle-stat.component';
import Statisticker from '../../../components/common/statisticker/statisticker.component';

import './profile.styles.scss';

export default function ProfilePage({ match }) {
  const { userId } = match.params;
  const user = useSelector((state) => {
    if (userId) {
      if (userId === state.user.currentUser.id) return state.user.currentUser;
      return state.user.users.find((user) => user.id === userId);
    } else {
      return state.user.currentUser;
    }
  });

  const registeredFrom = useMemo(() => {
    return Math.ceil((new Date().getTime() - new Date(user.createdTimestamp).getTime()) / (1000 * 60 * 60 * 24));
  }, [user.createdTimestamp]);

  return (
    <div className="profilePage">
      <div className="profilePage__avatarContainer">
        <Avatar circle size={130} imageURL={user.emiter.avatarUrl} />
        <Statisticker iconClassName="fas fa-cog" value={user.emiter.gears} />
      </div>
      <div className="profilePage__container">
        <div className="profilePage__container-userInfo">
          <p className="profilePage__container-userInfo-nickname">
            {user.nickname}
          </p>
          <p className="profilePage__container-userInfo-fullname">
            {user.name} {user.surname}
          </p>
          <p className="profilePage__container-userInfo-registeredFrom">
            Pilnuje spawnerów od <span>{registeredFrom}</span> {registeredFrom < 2 ? 'dnia' : 'dni'}
          </p>
          <p
            className={`profilePage__container-userInfo-status ${
              user.emiterSession.isInPlace ? 'isInPlace' : ''
            }`}
          >
            {user.emiterSession.isInPlace ? 'Zrespiony' : 'Nie zrespiony'}
          </p>
        </div>
        <p className="profilePage__container-userComment">{user.comment}</p>
        <div className="profilePage__container-userBattleStats">
          <BattleStat label="Wygrane" value={user.emiter.battlesWin} />
          <BattleStat label="Porażki" value={user.emiter.battlesLose} />
          <BattleStat label="Remisy" value={user.emiter.battlesDraw} />
        </div>
      </div>
    </div>
  );
}
