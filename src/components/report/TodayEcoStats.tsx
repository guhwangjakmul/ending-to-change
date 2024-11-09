import ProgressBar from '../common/ProgressBar'

import Wrapper from './ReportWrapper'

interface TodayEcoStatsProps {
  selectedDate: Date
  goalKm: number
  todaysDistance: number
}

export default function TodayEcoStats(props: TodayEcoStatsProps) {
  const { selectedDate, goalKm, todaysDistance } = props

  // 탄소 배출량 계산
  const carbon = ((todaysDistance / 16.04) * 2.097).toFixed(1)

  return (
    <Wrapper>
      <ProgressBar labelType="Km" currentProgress={todaysDistance} maxKm={goalKm} />
      <span className="inline-block text-center text-[15px] mt-[30px]">
        탄소배출량을 <span className="text-sky-blue">{carbon}kg CO₂e</span> 줄였어요!
      </span>
    </Wrapper>
  )
}
