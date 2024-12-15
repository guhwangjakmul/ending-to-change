export const getTodayDate = (): string => {
  const now = new Date()

  // 한국 표준시(KST)로 변환
  const kstOffset = 9 * 60 * 60 * 1000 // KST는 UTC+9
  const kstDate = new Date(now.getTime() + kstOffset)

  // yyyy-mm-dd 형식으로 변환
  const year = kstDate.getUTCFullYear()
  const month = String(kstDate.getUTCMonth() + 1).padStart(2, '0') // 월은 0부터 시작하므로 +1
  const day = String(kstDate.getUTCDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
