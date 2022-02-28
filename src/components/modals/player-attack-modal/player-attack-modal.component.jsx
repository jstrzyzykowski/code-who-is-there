import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../../../redux/modal/modal.actions';

import {getBattleResult} from '../../../utils/battle.utils';
import { drawExtraItem, getGears } from '../../../utils/reward.utils';

import EmiterDataService from '../../../services/emiter.service';
import BattlesCooldownsDataService from '../../../services/battlesCooldowns.service';

import ModalWrapper from '../../../modal/modal-wrapper.component';
import CustomButton from '../../common/custom-button/custom-button.component';

import './player-attack-modal.styles.scss';

export default function PlayerAttackModal({payload}) {
  // Defender data
  const {id, nickname, gears, avatarUrl} = payload;
  // Attacker data
  const {currentUser} = useSelector((state) => state.user);
  const {items} = useSelector((state) => state.item);
  const dispatch = useDispatch();

  const handleAttack = async () => {
    const result = await getBattleResult(currentUser.id, id);
    const rewardList = [];
    let attacker = {};
    let defender = {};

    if(result.resolved) {
      // We have battle result
      if(result.winner === currentUser.id) {
        // Attacker won
        const extraItem = await drawExtraItem(items);
        if(extraItem) rewardList.push(extraItem);

        const lootedGearsAmount = Math.floor(0.05 * gears);
        if(lootedGearsAmount) {
          const gearItem = await getGears(lootedGearsAmount);
          await EmiterDataService.addGearsToEnemy(id, gears, -lootedGearsAmount);
          await EmiterDataService.addGearsToUser(currentUser, lootedGearsAmount);
          rewardList.push(gearItem);
        } else {
          const gearItem = await getGears(1);
          await EmiterDataService.addGearsToUser(currentUser, gearItem.quantity);
          rewardList.push(gearItem);
        }

        attacker = {
          nickname: currentUser.nickname,
          avatarUrl: currentUser.emiter.avatarUrl,
          gearsResultValue: lootedGearsAmount > 0 ? lootedGearsAmount : 1,
          status: 'Winner',
          role: 'Attacker',
        };

        defender = {
          nickname: nickname,
          avatarUrl: avatarUrl,
          gearsResultValue: lootedGearsAmount > 0 ? -lootedGearsAmount : 1,
          status: 'Defeated',
          role: 'Defender',
        };
      } else {
        // Defender won
        //@TODO: zamiast Battle Rewards , tutaj info o szkodach, szansa na break eq item
        await EmiterDataService.addGearsToEnemy(id, gears, 2);

        attacker = {
          nickname: currentUser.nickname,
          avatarUrl: currentUser.emiter.avatarUrl,
          gearsResultValue: 0,
          status: 'Defeated',
          role: 'Attacker',
        };

        defender = {
          nickname: nickname,
          avatarUrl: avatarUrl,
          gearsResultValue: 2,
          status: 'Winner',
          role: 'Defender',
        };
      }

      await EmiterDataService.updateEmiterBattleStat(result.winner, 'battlesWin');
      await EmiterDataService.updateEmiterBattleStat(result.defeated, 'battlesLose');
    } else {
      // We have draw
      const gearItem = await getGears(1);
      await EmiterDataService.addGearsToUser(currentUser, gearItem.quantity);
      await EmiterDataService.addGearsToEnemy(id, gears, gearItem.quantity);
      rewardList.push(gearItem);

      attacker = {
        nickname: currentUser.nickname,
        avatarUrl: currentUser.emiter.avatarUrl,
        gearsResultValue: gearItem.quantity,
        status: 'Draw',
        role: 'Attacker',
      };

      defender = {
        nickname: nickname,
        avatarUrl: avatarUrl,
        gearsResultValue: gearItem.quantity,
        status: 'Draw',
        role: 'Defender',
      };

      await EmiterDataService.updateEmiterBattleStat(currentUser.id, 'battlesDraw');
      await EmiterDataService.updateEmiterBattleStat(id, 'battlesDraw');
    }

    await BattlesCooldownsDataService.setBattleCooldownOnUser(currentUser.id, id);

    dispatch(openModal({modalName: 'BattleResultModal', modalPayload: {
        rewardList,
        attacker,
        defender,
      }}));
  }

  return (
    <ModalWrapper title='Zaatakuj gracza'>
      <div className='playerAttackModal__header'>
        <p className='playerAttackModal__header-description'>
          Czy na pewno chcesz zaatakować gracza o nicku <span>{nickname}</span>? Gracz nie otrzyma pawiadomienia o Twoim ataku.
        </p>
      </div>
      <div className='playerAttackModal__body'>
        <div className='playerAttackModal__body-imageContainer'>
          <img src={avatarUrl} alt='' />
        </div>
        <div className='playerAttackModal__body-userInfo'>
          <p className='playerAttackModal__body-userInfo-nickname'>{nickname}</p>
          <p className='playerAttackModal__body-userInfo-gears'><i className='fas fa-cog'/>{gears}</p>
        </div>
      </div>
      <div className='playerAttackModal__actions'>
        <CustomButton onClick={() => dispatch(closeModal())}>Zamknij</CustomButton>
        <CustomButton onClick={handleAttack}>Atakuj</CustomButton>
      </div>
    </ModalWrapper>
  );
}