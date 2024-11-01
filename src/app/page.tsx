import ProgressBar from '@/components/common/ProgressBar'

export default function page() {
  const km = 5
  return (
    <div className="w-[500px] h-[500px] p-10 bg-slate-100 flex flex-col gap-5">
      {/* <div className="font-admin">Admin 폰트로 설정된 텍스트</div>
      <div className="font-user-m">User M 폰트로 설정된 텍스트</div>
      <div className="font-user-b">User B 폰트로 설정된 텍스트</div> */}
      <ProgressBar labelType="Lv" level={1} value={60} />
      <ProgressBar labelType="Lv" level={2} value={60} />
      <ProgressBar labelType="Lv" level={3} value={60} />

      <ProgressBar labelType="Lv" level={1} value={100} />
      <ProgressBar labelType="Lv" level={2} value={150} />
      <ProgressBar labelType="Lv" level={3} value={200} />

      {/* Km ProgressBar 사용 예시 - 아이콘이 있는 경우 */}
      <ProgressBar labelType="Km" value={2.4} showLabel={false} km={km} />

      {/* Km ProgressBar 사용 예시 - 아이콘이 없는 경우 */}
      <ProgressBar labelType="Km" value={2} />
    </div>
  )
}
