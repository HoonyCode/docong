import { memo, useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { UserAllDateAnalysis } from '../../api/analysis'
import produce from 'immer'

interface UserAllDateAnalysisProps {
  userAllDateAnalysis: UserAllDateAnalysis | null
}

function UserAllDateCountAnalysis({
  userAllDateAnalysis,
}: UserAllDateAnalysisProps) {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'S',
        data: [{ x: '', y: 0 }],
      },
      {
        name: 'F',
        data: [{ x: '', y: 0 }],
      },
      {
        name: 'T',
        data: [{ x: '', y: 0 }],
      },
      {
        name: 'W',
        data: [{ x: '', y: 0 }],
      },
      {
        name: 'T',
        data: [{ x: '', y: 0 }],
      },
      {
        name: 'M',
        data: [{ x: '', y: 0 }],
      },
      {
        name: 'S',
        data: [{ x: '', y: 0 }],
      },
    ],
    options: {
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
          return (
            '<div class="arrow_box">' +
            '<span>' +
            `${
              w.config.series[seriesIndex].data[dataPointIndex].x
                ? w.config.series[seriesIndex].data[dataPointIndex].x + ' 콩'
                : ''
            }` +
            '</span>' +
            '</div>'
          )
        },
      },
      xaxis: {
        categories: [''],
        labels: {
          show: false,
        },
      },
      colors: ['#4EB17C'],
      legend: {
        show: false,
      },
      plotOptions: {
        heatmap: {
          radius: 3,
          colorScale: {
            ranges: [
              {
                from: 0,
                to: 0,
                color: '#e9ecef',
              },
              {
                from: -1,
                to: -1,
                color: '#FFFFFF',
              },
            ],
          },
        },
      },
    },
  })

  useEffect(() => {
    if (userAllDateAnalysis) {
      const startYear = userAllDateAnalysis[0].localDate[0]
      const startMonth = userAllDateAnalysis[0].localDate[1]
      const startDay = userAllDateAnalysis[0].localDate[2]
      const firstDay = new Date(startYear, startMonth - 1, startDay).getDay()
      for (let i = 0; i < 7; i++) {
        if (i < firstDay) {
          setChartData(
            produce((draft) => {
              draft.series[6 - i].data = [{ x: '', y: -1 }]
            })
          )
        } else {
          setChartData(
            produce((draft) => {
              draft.series[6 - i].data = [
                {
                  x: `${userAllDateAnalysis[i - firstDay].localDate[0]}-${
                    userAllDateAnalysis[i - firstDay].localDate[1]
                  }-${userAllDateAnalysis[i - firstDay].localDate[2]}`,
                  y: userAllDateAnalysis[i - firstDay].count,
                },
              ]
            })
          )
        }
      }
      setChartData(
        produce((draft) => {
          for (let i = 6; i >= 0; i--) {
            draft.series[i].data = draft.series[i].data.concat(
              userAllDateAnalysis
                .slice(7 - firstDay)
                .filter((data, index) => index % 7 === 6 - i)
                .map((data) => ({
                  x: `${data.localDate[0]}-${data.localDate[1]}-${data.localDate[2]}`,
                  y: data.count,
                }))
            )
          }
        })
      )
    }
  }, [userAllDateAnalysis])

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="heatmap"
      width={'100%'}
      height={'77%'}
    />
  )
}

export default memo(UserAllDateCountAnalysis)
