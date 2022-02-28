import statisticsTypes from './statistic.types';

export const toggleEmiterStatsVisibility = () => {
  return {
    type: statisticsTypes.TOGGLE_EMITER_STATS_VISIBILITY,
  };
};