const degreeToRadian = (degree) => {
  return (degree * Math.PI) / 180;
};

export const distanceBtwCoordinates = (
  latitude1,
  longitude1,
  latitude2,
  longitude2
) => {
  const earthRadius = 6371; //km

  let dLat = degreeToRadian(latitude2 - latitude1);
  let dLon = degreeToRadian(longitude2 - longitude1);

  latitude1 = degreeToRadian(latitude1);
  latitude2 = degreeToRadian(latitude2);

  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(latitude1) *
      Math.cos(latitude2);
  let b = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadius * b;
};
