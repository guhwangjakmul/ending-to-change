import Wrapper from './ReportWrapper'
import ProgressBar from '../common/ProgressBar'

import { DateRecord } from '@/types/Date'

interface TodayEcoStatsProps {
  selectedDate: DateRecord | null
  goalKm: number
}

export default function TodayEcoStats(props: TodayEcoStatsProps) {
  const { selectedDate, goalKm } = props

  return (
    <Wrapper>
      <ProgressBar labelType="Km" currentProgress={selectedDate?.distance} maxKm={goalKm} />
      <span className="inline-block text-center text-[15px] mt-[30px]">
        탄소배출량을 <span className="text-sky-blue">{selectedDate?.carbon}kg CO₂e</span> 줄였어요!
      </span>
    </Wrapper>
  )
}
