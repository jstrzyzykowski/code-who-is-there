import React from 'react';

import {useSelector} from 'react-redux';

import UserList from '../../../components/user-list/user-list.component';
import EmptyInfo from '../../../components/empty-info/empty-info.component';

import PlaceImage from '../../../assets/place.jpg';

import './home.styles.scss';

export default function HomePage() {
  const {users} = useSelector((state) => state.user);

  const activeUsers = users.filter((user) => user.emiterSession.isInPlace);

  return (
    <div className="homePage">
      <div className='homePage__spot'>
        {/* BETA */}
        <div className='homePage__spot-message'>
          <i className='fas fa-exclamation'/>
          <p className='homePage__spot-message-text'>Wielkie dzięki za udział w testach! Beta potrwa do <span>30.12.2021</span>. Nagrody za ranking beta <span>31.12.2021</span>.</p>
        </div>
        <div className='homePage__spot-spotImageContainer'>
          <img src={PlaceImage} alt=""/>
        </div>
        <div className='homePage__spot-spotInfo'>
          <p className='homePage__spot-spotInfo-label'>
            <i className='fas fa-street-view'/>
          </p>
          <p className='homePage__spot-spotInfo-value'>{activeUsers.length} / {users.length}</p>
        </div>
      </div>
      <div className={`homePage__activeUsers ${activeUsers.length === 0 ? 'empty' : ''}`}>
        {activeUsers.length === 0 ? <EmptyInfo title='Puste boitko' description='Dzień 24 mojej wyprawy... kończą mi się zapasy - gdy już myślałem, że jestem u celu, boitko okazało się puste.'/> : <UserList users={activeUsers} withRank={false}/>}
      </div>
    </div>
  );
}