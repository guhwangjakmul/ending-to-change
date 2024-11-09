import ProgressBar from '../common/ProgressBar'
import Wrapper from './ReportWrapper'

interface TodayEcoStatsProps {
  selectedDate: Date
}

export default function TodayEcoStats(props: TodayEcoStatsProps) {
  const goalKm = 5
  const { selectedDate } = props

  return (
    <Wrapper>
      <ProgressBar labelType="Km" currentProgress={2.4} maxKm={goalKm} />
      <span className="inline-block text-center text-[15px] mt-[30px]">
        탄소배출량을 <span className="text-sky-blue">7.2kg CO₂e</span> 줄였어요!
      </span>
    </Wrapper>
  )
}
