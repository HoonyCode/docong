import { memo, useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { WorkTypeAnalysis } from '../../api/analysis'
import produce from 'immer'

interface UserCategoryAnalysisProps {
  workTypeAnalysis: WorkTypeAnalysis | null
}

function UserCategoryAnalysis({ workTypeAnalysis }: UserCategoryAnalysisProps) {
  const [chartData, setChartData] = useState({
    options: {
      labels: [''],
      colors: ['#d8f5a2', '#8ce99a'],
      chart: {
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
        style: {
          fontSize: '12px',
        },
      },
      stroke: {
        width: [0, 4],
      },
      legend: {
        fontSize: '16px',
        fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val + ' 콩'
          },
        },
      },
      yaxis: [
        {},
        {
          opposite: true,
        },
      ],
    },
    series: [
      {
        name: '전체 콩',
        type: 'column',
        data: [0],
      },
      {
        name: '평균 콩',
        type: 'line',
        data: [0],
      },
    ],
  })

  useEffect(() => {
    if (workTypeAnalysis) {
      setChartData(
        produce((draft) => {
          draft.options.labels = workTypeAnalysis.map((data) => data.workType)
          draft.series[0].data = workTypeAnalysis.map(
            (data) => data.totalPomo / 2
          )
          draft.series[1].data = workTypeAnalysis.map((data) =>
            Number((data.totalPomo / 2 / data.countTodo).toFixed(1))
          )
        })
      )
    }
  }, [workTypeAnalysis])

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="line"
      width={'95%'}
      height={'90%'}
    />
  )
}

export default memo(UserCategoryAnalysis)
