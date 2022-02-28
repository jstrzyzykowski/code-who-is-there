//TODO: This file is not necessary
// We need just range right now, so we can push this data
// to the emiter.utils.js file

const SPAWNER = {
  id: 1,
  displayName: 'Spawner Display Name',
  latitude: 52.7271,
  longitude: 15.2043,
  range: {
    latitude: {
      min: 52.7269,
      max: 52.7274,
    },
    longitude: {
      min: 15.2039,
      max: 15.2046,
    }
  }
};

export default SPAWNER;

// More accurate
// range: {
//   latitude: {
//     min: 52.72715,
//       max: 52.72725,
//   },
//   longitude: {
//     min: 15.20435,
//       max: 15.20445,
//   }
// }

// 52.7274 - 52.7273
// 52.7269 - 52.7270
// ----> 52.7269 - 52.7274

// 15.2046 - 15.2042
// 15.2039 - 15.2043
// ----> 15.2039 - 15.2046

// Place
// Lat: 52.7271
// Long: 15.2043

// Lat: 52.727164
// Long: 15.204319