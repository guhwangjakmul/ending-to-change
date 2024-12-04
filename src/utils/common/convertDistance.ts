export const convertDistance = (distanceInMeters: number): number => {
  // 항상 km 단위로 변환하여 소수점 둘째 자리까지 저장
  return parseFloat((distanceInMeters / 1000).toFixed(3))
}
