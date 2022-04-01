import { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { RankingDataList } from '../../api/analysis'
import produce from 'immer'

interface UserRankingProps {
  rankingList: RankingDataList | null
}

function UserRanking({ rankingList }: UserRankingProps) {
  const [chartData, setChartData] = useState({
    options: {
      xaxis: {
        categories: [''],
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        colors: ['#69db7c'],
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.3,
          inverseColors: true,
          opacityFrom: 0.7,
          opacityTo: 0.8,
          stops: [0, 50, 100],
        },
      },
    },
    series: [
      {
        data: [0],
      },
    ],
  })

  useEffect(() => {
    if (rankingList) {
      setChartData(
        produce((draft) => {
          draft.options.xaxis.categories = rankingList.map(
            (ranking) => ranking.userName
          )
          draft.series[0].data = rankingList.map(
            (ranking) => ranking.pomoCount / 2
          )
        })
      )
    }
  }, [rankingList])

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="bar"
      width={'90%'}
      height={'100%'}
    />
  )
}

export default UserRanking
