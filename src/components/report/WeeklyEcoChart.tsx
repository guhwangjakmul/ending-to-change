import Wrapper from './ReportWrapper'

interface WeeklyEcoChartProps {
  weekRange: { start: string; end: string } | null
}

export default function WeeklyEcoChart(props: WeeklyEcoChartProps) {
  const { weekRange } = props

  return (
    <Wrapper height={280}>
      {weekRange && (
        <div>
          <div>{`일주일 범위: ${weekRange.start} ~ ${weekRange.end}`}</div>
        </div>
      )}
    </Wrapper>
  )
}
