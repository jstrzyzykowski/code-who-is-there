import InventoryDataService from '../services/inventory.service';

export async function getBattleResult(attackerId, defenderId) {
  const attackerInventory = await InventoryDataService.getUserInventory(attackerId);
  const defenderInventory = await InventoryDataService.getUserInventory(defenderId);

  const attackerStats = computeFinalBattlePoints(attackerInventory);
  const defenderStats = computeFinalBattlePoints(defenderInventory);

  const attackerHp = attackerStats.total;
  const defenderHp = defenderStats.total;

  // Tutaj mozna dolaczyc do zwrotu info o ilosci punktow ale nie liczba a slownie, tak aby gracze nie znali swoich wartosci FBP

  if(attackerHp > defenderHp) return {
    resolved: true,
    winner: attackerId,
    defeated: defenderId,
  };
  if(attackerHp < defenderHp) return {
    resolved: true,
    winner: defenderId,
    defeated: attackerId,
  };

  return { resolved: false };
}

function computeFinalBattlePoints(playerInventory) {
  let playerTotalBattery = 0;
  let playerTotalRage = 0;
  let playerTotalShield = 0;

  for(const inventoryItem of playerInventory) {
    playerTotalBattery += inventoryItem.statistics.battery;
    playerTotalRage += inventoryItem.statistics.rage;
    playerTotalShield += inventoryItem.statistics.shield;
  }

  return {
    battery: playerTotalBattery,
    rage: playerTotalRage,
    shield: playerTotalShield,
    total: playerTotalBattery + playerTotalRage + playerTotalShield,
  };
}

// In progress
// function computePlayerBatteryBonus(playerBatteryNumber) {
//   let bonusPercent = Math.floor(playerBatteryNumber / 10) * 0.75;
//
//   return bonusPercent > 15 ? 15 : bonusPercent;
// }
