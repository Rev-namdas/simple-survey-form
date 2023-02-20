import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import LineChart from './linechart/LineChart';
import PieChart from './piechart/PieChart';
import "./chartbox.css"
import ApexCharts from "apexcharts";
// import { jsPDF } from "jspdf";
import pptxgen from "pptxgenjs";

export default function ChartPage() {
  const { state } = useLocation()
  const [chartSelection, setChartSelection] = useState([])
  let chartImgData = []

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

  const handleURI = () => {
    state?.questions?.forEach((_, index) => {
      if(chartSelection[index] === '1'){
        ApexCharts.exec(`chart-pie-${index}`, "dataURI").then(({ imgURI }) => {
          chartImgData.push(imgURI);
        })
      } else if(chartSelection[index] === '2'){
        ApexCharts.exec(`chart-line-${index}`, "dataURI").then(({ imgURI }) => {
          chartImgData.push(imgURI);
        })
      } 
    })
	}

  const handleDownload = () => {
    let pres = new pptxgen();
    
    chartImgData.forEach((each, index) => {
      let slide = pres.addSlide();

      slide.addText(state?.questions[index].question, {
        x: 0, y: '5%', w: '100%', h: '10%', 
        align: "center", fontSize: 12, bold: true
      })

      slide.addImage({ data: each, x: 2.5, y: 1, w: '50%', h: '45%' })

      slide.addText("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus molestias explicabo repudiandae dicta architecto hic laboriosam mollitia tenetur numquam nesciunt, rerum, nisi placeat voluptatibus nihil vitae at blanditiis, eaque culpa iusto id iste! Incidunt cum odit tenetur, assumenda placeat natus, corrupti voluptatem porro a omnis cupiditate quasi beatae delectus rerum?", {
        x: '10%', y: '70%', w: '80%', h: '30%', 
        align: "justify", valign: "top", fontSize: 12
      })
    })
    
    pres.writeFile({ fileName: "Report" });
  }
  // save as pdf
  // const handleDownload = () => {
  //   const doc = new jsPDF();
  //   doc.text("Hello world!", 20, 10);
  //   doc.addImage(data[0], 'png', 20, 15)
  //   doc.text("Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus delectus unde illum repudiandae, alias sed, voluptates, qui iste iure placeat doloremque dolore eligendi libero culpa totam at. Cupiditate vitae autem tenetur quasi, dolore porro quis exercitationem et aspernatur minus harum aliquam rerum natus fugit nemo labore maiores modi ea doloribus.",
  //    20, 100, { maxWidth: 170, align: "justify" });
  //   doc.addPage()
  //   doc.addImage(data[1], 'png', 10, 10)
  //   doc.save("a4.pdf");
  // }
  
  return (
    <>
      <br />

      <button onClick={handleURI}>Generate</button>
      <button onClick={handleDownload}>Download</button>
      
      {state?.questions?.map((each, index) => (
        <div key={index} className="chart-box">
          <div>
            <textarea name="" id="" cols="100" rows="5"></textarea>
          </div>
          {index + 1}. {each.question}
          <select value={chartSelection[index]} onChange={(e) => handleChartTypeSelection(e, index)}>
            <option value="1">Pie Chart</option>
            <option value="2">Bar Chart</option>
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
        </div>
      ))}
    </>
  )
}

// Data URI for PDF Download
// https://codesandbox.io/s/react-datauri-stackoverflow-60110892-iryeq?file=/src/App.js