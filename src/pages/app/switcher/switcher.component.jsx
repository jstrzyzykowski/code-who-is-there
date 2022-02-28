import React from 'react';

import Countdown from 'react-countdown';

import { useDispatch, useSelector } from 'react-redux';
import {openModal} from '../../../redux/modal/modal.actions';
import { calibrateStartAsync } from '../../../redux/emiter/emiter.actions';

import UsersDataService from '../../../services/users.service';
import { CALIBRATE_TIME_MS, handleComplete, increaseUserRewardCount, SESSION_TIME_MS } from './switcher.data';

import CustomIconButton from '../../../components/common/custom-icon-button/custom-icon-button.component';
import SectionHeader from '../../../components/section-header/section-header.component';
import CustomButton from '../../../components/common/custom-button/custom-button.component';

import { drawExtraItem, getGears } from '../../../utils/reward.utils';

import EmiterDataService from '../../../services/emiter.service';
import InventoryDataService from '../../../services/inventory.service';
import EmiterSessionDataService from '../../../services/emiter-session.service';

import './switcher.styles.scss';

export default function SwitcherPage() {
  const { currentUser } = useSelector((state) => state.user);
  const items = useSelector((state) => state.item.items);
  const dispatch = useDispatch();

  const toggleSwitcherState = async () => {
    try {
      if (!currentUser.emiterSession.isInPlace && currentUser.emiterSession.testStatus) {
        if(currentUser.emiterSession.rewardsNumber) {
          dispatch(openModal({modalName: 'MessageModal', modalPayload: {type: 'info', message: 'Najpierw odbierz swoje nagrody!'}}));
        } else {
          const timestamp = new Date().getTime();

          await UsersDataService.updateOneUser(currentUser.id, {
            emiterSession: {
              ...currentUser.emiterSession,
              isInPlace: true,
              sessionStartAt: timestamp,
              rewardsNumber: 0,
            }
          });
        }
      } else {
        await UsersDataService.updateOneUser(currentUser.id, {
          emiterSession: {
            ...currentUser.emiterSession,
            isInPlace: false,
            sessionStartAt: false,
          }
        });
      }
    } catch(error) {
      console.error(error.message);
    }
  };
  
  const handleGetReward = async () => {
    const rewardList = [];

    // BETA 1-3
    const gearAmount = Math.floor(Math.random() * 3) + 1;
    // NORMAL 2
    // BETA 1
    const gearItem = await getGears(gearAmount);
    await EmiterDataService.addGearsToUser(currentUser, gearItem.quantity);
    rewardList.push(gearItem);

    const extraItem = drawExtraItem(items);
    if(extraItem) {
      await InventoryDataService.addItemToUserInventory(currentUser, extraItem);
      rewardList.push(extraItem);
    }

    await EmiterSessionDataService.decreaseUserRewardsNumber(currentUser);
    dispatch(openModal({modalName: 'RewardModal', modalPayload: {
      rewardList,
      }}));
  }

  return (
    <div className="switcherPage">
      <div className="switcherPage__headerContainer">
        <SectionHeader>Kalibracja pozycji</SectionHeader>
        <div className="switcherPage__headerContainer-positionCheckerContainer">
          <div className="switcherPage__headerContainer-positionCheckerContainer-infoContainer">
            <p className="switcherPage__headerContainer-positionCheckerContainer-infoContainer-label">
              Emiter
            </p>
            {currentUser.emiterSession.testStatus ? (
              <p>
                Następna kalibracja za <Countdown date={currentUser.emiterSession.lastTestAt + CALIBRATE_TIME_MS} zeroPadTime={2} onComplete={() => handleComplete(currentUser)}/>
              </p>
            ) : (
              <p>Wymagana kalibracja</p>
            )}
          </div>
          <div className='switcherPage__headerContainer-positionCheckerContainer-buttonsContainer'>
            <div className={`switcherPage__headerContainer-positionCheckerContainer-buttonsContainer-status ${currentUser.emiterSession.testStatus ? 'verified' : ''}`}>
              <i className='fas fa-map-marker-alt'/>
            </div>
            <CustomButton blue={!currentUser.emiterSession.testStatus} onClick={() => dispatch(calibrateStartAsync(currentUser))}>Kalibruj</CustomButton>
          </div>
        </div>
      </div>
      <div className={`switcherPage__switcherContainer ${currentUser.emiterSession.testStatus ? 'verified' : ''}`}>
        <div className="switcherPage__switcherContainer-gateLeft" />
        <div className={`switcherPage__switcherContainer-buttonContainer ${currentUser.emiterSession.isInPlace ? 'isInPlace' : ''}`}>
          <CustomIconButton
            iconClassName="fas fa-power-off"
            circle
            handler={toggleSwitcherState}
          />
        </div>
        <div className="switcherPage__switcherContainer-gateRight" />
      </div>
      <div className="switcherPage__sessionStatusContainer">
        <SectionHeader>Status sesji</SectionHeader>
        <div className='switcherPage__sessionStatusContainer-sessionTime'>
          <div className='switcherPage__sessionStatusContainer-sessionTime-labelContainer'>
            <p className='switcherPage__sessionStatusContainer-sessionTime-labelContainer-text'>Czas</p>
            <p className='switcherPage__sessionStatusContainer-sessionTime-labelContainer-description'>Odbierz nagrodę po <span>1h</span> sesji</p>
          </div>
          <p className='switcherPage__sessionStatusContainer-sessionTime-value'>
          {currentUser.emiterSession.sessionStartAt ? (
              <span className='switcherPage__sessionStatusContainer-sessionTime-value-sessionInProgress'>
                <Countdown date={currentUser.emiterSession.sessionStartAt + SESSION_TIME_MS} zeroPadTime={2} onComplete={() => increaseUserRewardCount(currentUser)}/>
              </span>
          ) : (
              <span>00:00:00</span>
          )}
          </p>
        </div>
      </div>
      <div className="switcherPage__rewardContainer">
        <SectionHeader>Nagroda</SectionHeader>
        {currentUser.emiterSession.rewardsNumber ? (
          <div className='switcherPage__rewardContainer-rewardInfo'>
            <i className='fas fa-question'/>
            <div className='switcherPage__rewardContainer-rewardInfo-textContainer'>
              <p className='switcherPage__rewardContainer-rewardInfo-textContainer-title'>Tajemnicze pudło <span>x{currentUser.emiterSession.rewardsNumber}</span></p>
              <p className='switcherPage__rewardContainer-rewardInfo-textContainer-description'>Podobno ktoś kiedyś trafił żelki</p>
            </div>
            <CustomButton green onClick={handleGetReward}>Odbierz</CustomButton>
          </div>
        ) : (
          <div className='switcherPage__rewardContainer-empty'>
            <i className='fas fa-box-open'/>
          </div>
        )}
      </div>
    </div>
  );
}
