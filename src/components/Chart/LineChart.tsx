import React, {useRef} from 'react'
import {Line}          from 'react-chartjs-2'
import { formatPrice } from 'util/utils'

export interface ILineChartProps {
  label ?: string
  labels ?: string[]
  chartData : any,
  width?: number
  height?: number
  options?: any
  showCurrency?: boolean
}

const LineChart = ({chartData,label, labels, width = 450, height = 250,options, showCurrency} : ILineChartProps) => {
  const chartRef = useRef(null)
  const data = {
    labels: labels || ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
    datasets: [
      {
        label: label,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgb(24, 66, 100)',
        borderColor: 'rgb(24, 66, 100)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: chartData
      }
    ]
  }
  const _options = Object.assign({
    ...options,
    maintainAspectRatio: false,
    responsive: true,
  },
    showCurrency ? {
      tooltips: {
        callbacks: {
          label: (tooltipItem: any, chart: any) => {
            const datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || ''
            return `${datasetLabel}: ${formatPrice(tooltipItem.yLabel)}`
          }
        }
      },
      scales: {
        xAxes: [{
          ticks: {}
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 500000,
            callback: (value: any, index: number, values: any) => {
              return formatPrice(value)
            }
          }
        }]
      },
    } : {})

  return (
    <Line
      ref={chartRef}
      data={data}
      width={width}
      height={height}
      options={_options}
    />
  )
}

export default LineChart
