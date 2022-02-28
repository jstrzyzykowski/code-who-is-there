import { database, storage } from './firebase.utils';
import {DATABASE_ITEMS} from '../data/item.data';

export async function createItemsOfType(type) {
  const itemsSchema = DATABASE_ITEMS[type];

  try {
    for(const itemSchema of itemsSchema) {
      const {id, displayName, rarity, statistics, price} = itemSchema;

      const imageUrl = await storage.ref(`items/${type}/${id}.jpg`).getDownloadURL();
      const item = {
        type,
        displayName,
        price,
        rarity,
        imageUrl,
        statistics: {
          battery: statistics.battery,
          rage: statistics.rage,
          shield: statistics.shield,
        }
      };
      await database.ref(`items/${id}`).set(item);
    }
  } catch(err) {
    console.log(err.message);
  }
}