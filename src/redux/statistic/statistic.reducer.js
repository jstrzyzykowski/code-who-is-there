import statisticsTypes from './statistic.types';

const INITIAL_STATE = {
  areEmiterStatsVisible: true,
};

export default function statisticReducer(state = INITIAL_STATE, {type, payload}) {
  switch (type) {
    case statisticsTypes.TOGGLE_EMITER_STATS_VISIBILITY:
      return {
        ...state,
        areEmiterStatsVisible: !state.areEmiterStatsVisible,
      };
    default:
      return state;
  }
};