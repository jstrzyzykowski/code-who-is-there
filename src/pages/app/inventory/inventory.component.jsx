import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {toggleEmiterStatsVisibility} from '../../../redux/statistic/statistic.actions';

import { createStructuredSelector } from 'reselect';
import { selectEmiterStats } from '../../../redux/user/user.selectors';
import { selectStatsVisibility } from '../../../redux/statistic/statistic.selectors';

import SectionHeader from '../../../components/section-header/section-header.component';
import CustomButton from '../../../components/common/custom-button/custom-button.component';
import InventoryList from '../../../components/inventory-list/inventory-list.component';

import './inventory.styles.scss';

export default function InventoryPage() {
  const {emiterStats, emiterStatsVisibility} = useSelector(createStructuredSelector({
    emiterStats: selectEmiterStats,
    emiterStatsVisibility: selectStatsVisibility,
  }))
  const dispatch = useDispatch();

  return (
    <div className='inventoryPage'>
      <div className='inventoryPage__emiterStatsSection'>
        <SectionHeader>
          Statystyki emitera
        </SectionHeader>
        <div className='inventoryPage__emiterStatsSection-statsContainer'>
          <div className='inventoryPage__emiterStatsSection-statsContainer-statContainer'>
            <i className='fas fa-battery-full'/>
            <p className='inventoryPage__emiterStatsSection-statsContainer-statContainer-statLabel'>Akumulator</p>
            <p className='inventoryPage__emiterStatsSection-statsContainer-statContainer-statValue'>{emiterStatsVisibility ? emiterStats[0] : '? ? ?'}</p>
          </div>
          <div className='inventoryPage__emiterStatsSection-statsContainer-statContainer'>
            <i className='fas fa-fist-raised'/>
            <p className='inventoryPage__emiterStatsSection-statsContainer-statContainer-statLabel'>Uzbrojenie</p>
            <p className='inventoryPage__emiterStatsSection-statsContainer-statContainer-statValue'>{emiterStatsVisibility ? emiterStats[1] : '? ? ?'}</p>
          </div>
          <div className='inventoryPage__emiterStatsSection-statsContainer-statContainer'>
            <i className='fas fa-shield-alt'/>
            <p className='inventoryPage__emiterStatsSection-statsContainer-statContainer-statLabel'>Pole ochronne</p>
            <p className='inventoryPage__emiterStatsSection-statsContainer-statContainer-statValue'>{emiterStatsVisibility ? emiterStats[2] : '? ? ?'}</p>
          </div>
          <CustomButton red={emiterStatsVisibility} green={!emiterStatsVisibility} onClick={() => dispatch(toggleEmiterStatsVisibility())}>{emiterStatsVisibility ? 'Ukryj' : 'Pokaż'}</CustomButton>
        </div>
      </div>
      <div className='inventoryPage__emiterInventory'>
        <InventoryList/>
      </div>
    </div>
  );
}