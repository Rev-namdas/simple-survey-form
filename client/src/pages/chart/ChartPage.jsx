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

  const getRankingChartData = (payload) => {
    const arr = [] 
    const total = payload.filter(each => each !== "").length
    
    payload
      .filter(each => each !== "")
      .forEach(each => {
        each.split(",").forEach(each => {
          arr.push(each.trim())
        })
      })

    const obj = {}
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      obj[element] = obj[element] ? obj[element] + 1 : 1;
    }

    let labels = Object.keys(obj)
    let values = Object.values(obj)

    return [labels, values, total]
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
            <option value="3">Pie Chart (Unique Data)</option>
            <option value="4">Bar Chart (Unique Data)</option>
          </select>

          {chartSelection[index] === '1' &&
            <PieChart 
              index={index}
              labels={getChartData(state?.answers?.map(each => each[index]?.answer))[0]}
              values={getChartData(state?.answers?.map(each => each[index]?.answer))[1]}
            />
          }

          {chartSelection[index] === '2' &&
            <LineChart 
              index={index}
              labels={getChartData(state?.answers?.map(each => each[index]?.answer))[0]}
              values={getChartData(state?.answers?.map(each => each[index]?.answer))[1]}
            />
          }

          {chartSelection[index] === '3' &&
            <PieChart 
              index={index}
              labels={getRankingChartData(state?.answers?.map(each => each[index]?.answer))[0]}
              values={getRankingChartData(state?.answers?.map(each => each[index]?.answer))[1]}
              customDataLabels
              totalResponse={getRankingChartData(state?.answers?.map(each => each[index]?.answer))[2]}
            />
          }

          {chartSelection[index] === '4' &&
            <LineChart 
              index={index}
              labels={getRankingChartData(state?.answers?.map(each => each[index]?.answer))[0]}
              values={getRankingChartData(state?.answers?.map(each => each[index]?.answer))[1]}
              customDataLabels
              totalResponse={getRankingChartData(state?.answers?.map(each => each[index]?.answer))[2]}
            />
          }
        </div>
      ))}
    </>
  )
}

// Data URI for PDF Download
// https://codesandbox.io/s/react-datauri-stackoverflow-60110892-iryeq?file=/src/App.js