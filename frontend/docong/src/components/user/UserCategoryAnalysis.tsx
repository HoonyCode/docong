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
      labels: [
        '기획',
        '설계',
        '디자인',
        '컨설팅',
        '개발',
        'QA',
        '분석',
        '운영',
        '회계',
        '제작',
        '관리',
        '홍보',
        '인사',
        '문서화',
        '학습',
        '독서',
        '기타',
      ],
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
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: '평균 콩',
        type: 'line',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  })

  useEffect(() => {
    if (workTypeAnalysis) {
      setChartData(
        produce((draft) => {
          for (let i = 0; i < workTypeAnalysis.length; i++) {
            const index = draft.options.labels.indexOf(
              workTypeAnalysis[i].workType
            )
            draft.series[0].data[index] = workTypeAnalysis[i].totalPomo / 2
            draft.series[1].data[index] = Number(
              (
                workTypeAnalysis[i].totalPomo /
                2 /
                workTypeAnalysis[i].countTodo
              ).toFixed(1)
            )
          }
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
      height={'88%'}
    />
  )
}

export default memo(UserCategoryAnalysis)
