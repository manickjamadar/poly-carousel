const calculateDistanceToCenter = (width: number, totalSide: number) => {
  if (width <= 0 || totalSide < 3) {
    return 0;
  }
  const centralAngle = Math.PI / totalSide;
  const distance = width / (2 * Math.tan(centralAngle));
  return distance;
};
export default calculateDistanceToCenter;
