import React from 'react'
import ReactApexChart from 'react-apexcharts'

export default function LineChart({ labels = [], values = [] }) {
	const data = {
		series: [{
		  name: 'Percentage',
		  data: values
		}],
		options: {
		  chart: {
			height: 350,
			type: 'bar',
		  },
		  plotOptions: {
			bar: {
			  borderRadius: 10,
			  dataLabels: {
				position: 'top', // top, center, bottom
			  },
			}
		  },
		  dataLabels: {
			enabled: true,
			formatter: function (val) {
				const total = values.reduce((a,b) => a+b)
				const percentage = ((100 / total) * val).toFixed(1)
				return percentage + "%";
			},
			offsetY: -20,
			style: {
			  fontSize: '12px',
			  colors: ["#304758"]
			}
		  },
		  
		  xaxis: {
			categories: labels,
			position: 'top',
			axisBorder: {
			  show: false
			},
			axisTicks: {
			  show: false
			},
			crosshairs: {
			  fill: {
				type: 'gradient',
				gradient: {
				  colorFrom: '#D8E3F0',
				  colorTo: '#BED1E6',
				  stops: [0, 100],
				  opacityFrom: 0.4,
				  opacityTo: 0.5,
				}
			  }
			},
			tooltip: {
			  enabled: true,
			}
		  },
		  yaxis: {
			axisBorder: {
			  show: false
			},
			axisTicks: {
			  show: false,
			},
			labels: {
				show: true,
				formatter: function (val) {
					const total = values.reduce((a,b) => a+b)
					const percentage = ((100 / total) * val).toFixed(1)
					return percentage + "%";
				}
			}
		  
		  }
		}
	  }

  return (
	<>
		<ReactApexChart 
			options={data.options} 
			series={data.series} 
			type="bar" 
			height={350} 
			width={'50%'}
		/>
	</>
  )
}
