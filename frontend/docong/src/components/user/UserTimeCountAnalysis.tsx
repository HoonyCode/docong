import { memo, useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { UserTimeAnalysis } from '../../api/analysis'
import produce from 'immer'

interface UserTimeAnalysisProps {
  userTimeAnalysis: UserTimeAnalysis | null
}

function UserTimeCountAnalysis({ userTimeAnalysis }: UserTimeAnalysisProps) {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: '콩 합계',
        data: [0],
      },
    ],
    options: {
      chart: {
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
    },
  })

  useEffect(() => {
    if (userTimeAnalysis) {
      setChartData(
        produce((draft) => {
          draft.series[0].data = userTimeAnalysis.map((data) => data.cnt)
        })
      )
    }
  }, [userTimeAnalysis])

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="area"
      width={'95%'}
      height={'85%'}
    />
  )
}

export default memo(UserTimeCountAnalysis)
