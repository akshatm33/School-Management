const EARTH_RADIUS_KM = 6371;

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// Uses Haversine formula to calculate distance between two geographic points
function calculateDistance(latitude1, longitude1, latitude2, longitude2) {
  const lat1Rad = degreesToRadians(latitude1);
  const lon1Rad = degreesToRadians(longitude1);
  const lat2Rad = degreesToRadians(latitude2);
  const lon2Rad = degreesToRadians(longitude2);

  const deltaLat = lat2Rad - lat1Rad;
  const deltaLon = lon2Rad - lon1Rad;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = EARTH_RADIUS_KM * c;

  return distance;
}

module.exports = calculateDistance;
