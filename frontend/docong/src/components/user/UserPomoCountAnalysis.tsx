import { memo, useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { UserPomoCount } from '../../api/analysis'
import produce from 'immer'

interface UserPomoCountAnalysisProps {
  userPomoCountAnalysis: UserPomoCount | null
}

function UserPomoCountAnalysis({
  userPomoCountAnalysis,
}: UserPomoCountAnalysisProps) {
  const [chartData, setChartData] = useState({
    series: [0],
    options: {
      labels: [''],
      chart: {
        animations: {
          enabled: true,
        },
      },
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
      },
      fill: {
        type: 'gradient',
      },
      legend: {
        fontSize: '16px',
        fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
        customLegendItems: [''],
      },
    },
  })

  useEffect(() => {
    if (userPomoCountAnalysis) {
      setChartData(
        produce((draft) => {
          draft.options.labels = ['개인'].concat(
            userPomoCountAnalysis.teamPomoCount.map((data) => data.teamName)
          )
          draft.series = [userPomoCountAnalysis.singlePomoCount].concat(
            userPomoCountAnalysis.teamPomoCount.map((data) => data.pomoCount)
          )
          draft.options.legend.customLegendItems = [
            ` 개인 (${userPomoCountAnalysis.singlePomoCount} 콩)`,
          ].concat(
            userPomoCountAnalysis.teamPomoCount
              .map((data) => ` ${data.teamName} (${data.pomoCount} 콩)`)
              .concat(` 합계 : 총 ${userPomoCountAnalysis.totalPomoCount} 콩`)
          )
        })
      )
    }
  }, [userPomoCountAnalysis])

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="donut"
      width={'95%'}
      height={'90%'}
    />
  )
}

export default memo(UserPomoCountAnalysis)
