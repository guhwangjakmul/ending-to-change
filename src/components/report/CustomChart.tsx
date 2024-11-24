import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import moment from 'moment'
import { Chart } from 'react-chartjs-2'

interface ChartProps {
  filteredWeeklyData: { created_at: string; distance: number; carbon: number }[]
}

// Chart.js에 필요한 요소 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function CustomChart(props: ChartProps) {
  const { filteredWeeklyData } = props

  // 요일 라벨
  const labels = ['월', '화', '수', '목', '금', '토', '일']

  // 요일별 거리 데이터를 초기화
  const distancesByDay = labels.map(label => {
    const dayIndex = labels.indexOf(label) + 1
    console.log(dayIndex)
    const record = filteredWeeklyData.find(
      item => moment(item.created_at).isoWeekday() === dayIndex,
    )
    return record ? record.distance : 0
  })

  // 데이터 샘플
  const data = {
    labels,
    datasets: [
      {
        label: '',
        data: distancesByDay,
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

  return <Chart type="bar" data={data} options={options} />
}
