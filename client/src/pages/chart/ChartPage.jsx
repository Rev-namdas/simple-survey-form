import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import LineChart from './linechart/LineChart';
import PieChart from './piechart/PieChart';
import "./chartbox.css"

export default function ChartPage() {
  const { state } = useLocation()
  const [chartSelection, setChartSelection] = useState([])

  useEffect(() => {
    window.scrollTo(0,0)

    const arr = state?.questions.map(_ => '1')
    setChartSelection(arr)
  }, 
  //eslint-disable-next-line
  [])

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
    const update = [...chartSelection]
    update[index] = e.target.value
    setChartSelection(update)
  }
  
  return (
    <>
      <br />
      {state?.questions?.map((each, index) => (
        <div key={index} className="chart-box">
          {index + 1}. {each.question}
          <select value={chartSelection[index]} onChange={(e) => handleChartTypeSelection(e, index)}>
            <option value="1">Pie Chart</option>
            <option value="2">Bar Chart</option>
          </select>

          {chartSelection[index] === '1' &&
            <PieChart 
              labels={getChartData(state?.answers?.map(each => each[index]?.answer))[0]}
              values={getChartData(state?.answers?.map(each => each[index]?.answer))[1]}
            />
          }

          {chartSelection[index] === '2' &&
            <LineChart 
              labels={getChartData(state?.answers?.map(each => each[index]?.answer))[0]}
              values={getChartData(state?.answers?.map(each => each[index]?.answer))[1]}
            />
          }
        </div>
      ))}
    </>
  )
}
