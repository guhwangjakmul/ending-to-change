interface DistanceSettingProps {
  goalKm: number
  setGoalKm: (value: number) => void
}

export default function DistanceSetting(props: DistanceSettingProps) {
  const { goalKm, setGoalKm } = props

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoalKm(Number(e.target.value))
  }

  return (
    <div className="flex justify-end mb-[10px] pr-2">
      <span className="font-gosindinaru-m text-xs text-light-gray border-b border-light-gray">
        거리 설정
      </span>
      <input type="number" value={goalKm} onChange={handleGoalChange} />
    </div>
  )
}
