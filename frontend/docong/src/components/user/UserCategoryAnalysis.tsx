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
      labels: ['Team A', 'Team B'],
      colors: [
        '#ffa94d',
        '#ffd43b',
        '#a9e34b',
        '#69db7c',
        '#38d9a9',
        '#3bc9db',
        '#4dabf7',
        '#748ffc',
        '#9775fa',
        '#da77f2',
      ],
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '16px',
        },
      },
      fill: {
        type: 'gradient',
      },
      legend: {
        fontSize: '20px',
        formatter: function (val: any, opts: any) {
          return (
            ' ' + val + ' : ' + opts.w.globals.series[opts.seriesIndex] + ' 콩'
          )
        },
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val + ' 콩'
          },
        },
      },
    },
    series: [44, 55],
  })

  useEffect(() => {
    console.log(workTypeAnalysis)
    if (workTypeAnalysis) {
      setChartData(
        produce((draft) => {
          draft.options.labels = workTypeAnalysis.map((data) => data.workType)
          draft.series = workTypeAnalysis.map((data) => data.totalPomo / 2)
        })
      )
    }
  }, [workTypeAnalysis])

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="pie"
      width={'90%'}
      height={'100%'}
    />
  )
}

export default memo(UserCategoryAnalysis)
