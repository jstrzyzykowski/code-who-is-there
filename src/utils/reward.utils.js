import ItemsDataService from '../services/items.service';

export function drawExtraItem(items) {
  const generatorNumber = Math.floor(Math.random() * 100) + 1;
  // 2% for additional reward (99, 100)
  if(generatorNumber >= 99) {
    const itemsForDraw = items.filter((item) => item.type !== 'system');
    const itemIndexNumber = Math.floor(Math.random() * itemsForDraw.length);

    return {
      ...itemsForDraw[itemIndexNumber],
      quantity: 1,
    };
  } else return null;
}

export async function getGears(amount) {
  const gearItem = await ItemsDataService.getOneItemData('system-gear');

  return {
    ...gearItem,
    quantity: amount,
  };
}