// import React from "react";
// import Chart from "chart.js/auto";
// import { Pie } from "react-chartjs-2";
// import 'chartjs-plugin-datalabels';

// const labels = ["January", "February", "March", "April", "May", "June"];
// const data = {
//   labels: labels,
//   datasets: [
//     {
//       label: "Population",
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.6)',
//         'rgba(54, 162, 235, 0.6)',
//         'rgba(255, 206, 86, 0.6)',
//         'rgba(75, 192, 192, 0.6)',
//         'rgba(153, 102, 255, 0.6)',
//         'rgba(255, 159, 64, 0.6)',
//         'rgba(255, 99, 132, 0.6)'
//       ],
//       borderColor: "rgb(0,0,0)",
//       data: [10, 5, 2, 20, 30, 45],
//     },
//   ],
// };
// const ChartPage = () => {
//   return (
//     <div style={{ height: '20rem', width: '20rem' }}>
//       <Pie 
//         data={data}
//         options={{
//           plugins: {
//             labels: {
//               render: (args) => {
//                 return args.label
//               }
//             }
//           } 
//         }}
//       />
//     </div>
//   );
// };
// export default ChartPage;

import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import LineChart from './linechart/LineChart';
import PieChart from './piechart/PieChart';
// import ReactApexChart from 'react-apexcharts'

export default function ChartPage() {
  const { state } = useLocation()
  const [selection, setSelection] = useState([])

  const getChartData = (payload) => {
    let arr = payload;
    let count = {};

    for (let i = 0; i < arr.length; i++) {
      let num = arr[i];
      count[num] = count[num] ? count[num] + 1 : 1;
    }
    let values = Object.values(count)
    let labels = Object.keys(count)

    const foundIndex = labels.indexOf('')

    if(foundIndex >= 0){
      labels.splice(foundIndex, 1)
      values.splice(foundIndex, 1)
    }

    labels = labels.map(each => {
      if(each.split(" ").length > 1){
        return each.split(" ")
      } else {
        return each
      }
    })

    return [labels, values]
  }

  const handleChartTypeSelection = (e, index) => {
    const update = [...selection]
    update[index] = e.target.value
    setSelection(update)
  }
  
  return (
    <>
      <br />
      {state?.questions?.map((each, index) => (
        <>
        <button onClick={() => console.log(selection)}>print</button>
          <div key={index} style={{ marginLeft: '5rem' }}>
            {each.question}
            <select value={selection[index]} onChange={(e) => handleChartTypeSelection(e, index)}>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
            <PieChart 
              labels={getChartData(state?.answers?.map(each => each[index]?.answer))[0]}
              values={getChartData(state?.answers?.map(each => each[index]?.answer))[1]}
              />
            <LineChart 
              labels={getChartData(state?.answers?.map(each => each[index]?.answer))[0]}
              values={getChartData(state?.answers?.map(each => each[index]?.answer))[1]}
            />
          </div>
          <br />
        </>
      ))}
    </>
  )
}
