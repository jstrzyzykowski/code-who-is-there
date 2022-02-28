import {createSelector} from 'reselect';

const selectStatistic = (state) => state.statistic;

export const selectStatsVisibility = createSelector(
  [selectStatistic],
  (statistic) => statistic.areEmiterStatsVisible,
);