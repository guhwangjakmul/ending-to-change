import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'

import Wrapper from './ReportWrapper'

interface WeeklyEcoChartProps {
  weekRange: { start: string; end: string } | null
}

// Chart.js에 필요한 요소 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function WeeklyEcoChart(props: WeeklyEcoChartProps) {
  const { weekRange } = props

  const formatWeekRange = (range: { start: string; end: string }) => {
    const startDate = range.start.split(' ')
    const endDate = range.end.split(' ')

    const startedFormatted = `${startDate[1]} ${startDate[2].slice(0, -1)}`
    const endFormatted = endDate[2]

    return `${startedFormatted} - ${endFormatted}`
  }

  // 데이터 샘플
  const data = {
    labels: ['월', '화', '수', '목', '금', '토', '일'],
    datasets: [
      {
        label: '',
        data: [2.3, 1.8, 3.2, 2.7, 3.5, 2.9, 4.1],
        backgroundColor: 'rgba(255, 206, 0, 1)',
        borderColor: 'rgba(255, 206, 0, 1)',
        borderRadius: Number.MAX_VALUE,
        borderSkipped: false,
        barPercentage: 0.9,
      },
    ],
  }

  // 차트 옵션
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        displayColors: false,
        backgroundColor: 'rgba(206, 198, 186, 1)',
        bodyFont: { size: 12 },
        fontFamily: '"gothic-b", sans-serif',
        padding: 10,
        cornerRadius: 10,
        callbacks: {
          title: () => '',
          label: function (context: any) {
            return `${context.raw}km`
          },
        },
      },
    },
    hover: {
      mode: undefined,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: 'rgba(126, 114, 92, 1)',
          font: {
            size: 15,
            family: '"gothic-b", sans-serif',
          },
        },
      },
      y: {
        display: false,
      },
    },
  }

  return (
    <Wrapper height={280} paddingX={70}>
      <div className="text-[15px] mb-[15px]">
        {weekRange ? formatWeekRange(weekRange) : '아직 일주일 통계가 없습니다'}
      </div>
      <Chart type="bar" data={data} options={options} />
      <span className="text-[15px] mt-[15px]">
        총 <span className="text-mint-green">7.2kg CO₂e</span> 절약했어요
      </span>
    </Wrapper>
  )
}
