import Wrapper from './ReportWrapper'
import CustomChart from './CustomChart'

interface WeeklyEcoChartProps {
  weekRange: { start: string; end: string } | null
  filteredWeeklyData: { date: string; distance: number; carbon: number }[]
}

export default function WeeklyEcoChart(props: WeeklyEcoChartProps) {
  const { weekRange, filteredWeeklyData } = props

  const formatWeekRange = (range: { start: string; end: string }) => {
    const startDate = range.start.split('-')
    const endDate = range.end.split('-')

    const startedFormatted = `${startDate[1]}월 ${startDate[2]}`
    const endFormatted = `${endDate[2]}일`

    return `${startedFormatted} - ${endFormatted}`
  }

  // carbon 합계 계산
  const totalCarbon = filteredWeeklyData.reduce((acc, record) => acc + record.carbon, 0).toFixed(1)

  return (
    <Wrapper height={280} paddingX={70}>
      <div className="text-[15px] mb-[15px]">
        {weekRange ? formatWeekRange(weekRange) : '아직 일주일 통계가 없습니다'}
      </div>
      <CustomChart filteredWeeklyData={filteredWeeklyData} />
      <span className="text-[15px] mt-[15px]">
        총 <span className="text-mint-green">{totalCarbon}kg CO₂e</span> 절약했어요
      </span>
    </Wrapper>
  )
}
