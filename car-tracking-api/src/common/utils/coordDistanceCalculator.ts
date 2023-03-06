const calcDistanceInKM = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) => {
  const earthRadius = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLng = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceInKM = earthRadius * c;
  return distanceInKM;
};

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

export default calcDistanceInKM;
