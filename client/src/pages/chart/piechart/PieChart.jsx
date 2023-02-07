import React from 'react'
import ReactApexChart from 'react-apexcharts'

export default function PieChart({ labels = [], values = [] }) {
  const data = {
    series: values,
    options: {
      chart: {
        width: '50%',
        type: 'pie',
        toolbar: {
          show: true
        }
      },
      labels: labels,
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: '50%'
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }
  };
  
  return (
    <>
      <ReactApexChart 
        id="download"
        options={data.options} 
        series={data.series} 
        type="pie" 
        width={'40%'}
      />
    </>
  )
}