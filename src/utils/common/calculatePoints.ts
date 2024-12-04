export const calculatePoints = (distanceInMeters: number): number => {
  const distanceInKm = distanceInMeters / 1000 // m -> km 변환
  const wholeKm = Math.floor(distanceInKm) // 정수 부분만 추출 (km 단위로 계산)
  const extraPoints = distanceInKm > wholeKm ? 1 : 0 // 남은 거리로 1 포인트 추가 여부 결정
  return wholeKm * 2 + extraPoints
}
