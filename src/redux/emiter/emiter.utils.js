import SPAWNER from '../../data/spawner.data';

export function checkCoordinates(lat, long) {
  const {latitude, longitude} = SPAWNER.range;

  const isLatOk = lat >= latitude.min && lat <= latitude.max;
  const isLongOk = long >= longitude.min && long <= longitude.max;

  return (isLatOk && isLongOk);
}