import Wrapper from './ReportWrapper'

interface TodayEcoStatsProps {
  selectedDate: Date
}

export default function TodayEcoStats(props: TodayEcoStatsProps) {
  const { selectedDate } = props
  return <Wrapper> {selectedDate.toLocaleDateString('ko-KR')}</Wrapper>
}
