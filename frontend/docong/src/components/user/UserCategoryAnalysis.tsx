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
        '#ffc078',
        '#ffe066',
        '#c0eb75',
        '#8ce99a',
        '#63e6be',
        '#66d9e8',
        '#74c0fc',
        '#91a7ff',
        '#b197fc',
        '#e599f7',
        '#faa2c1',
        '#ffa8a8',
        '#ffd8a8',
        '#ffec99',
        '#d8f5a2',
        '#b2f2bb',
        '#ced4da',
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
