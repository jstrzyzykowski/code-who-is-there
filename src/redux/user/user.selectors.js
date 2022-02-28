import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser,
);

export const selectUserInventory = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser.inventory,
);

export const selectEmiterStats = createSelector(
  [selectUserInventory],
  (inventory) =>
    inventory.reduce(
      (acc, {statistics, quantity}) => [
        acc[0] + statistics.battery * quantity,
        acc[1] + statistics.rage * quantity,
        acc[2] + statistics.shield * quantity,
      ],
      [0, 0, 0],
    ),
);