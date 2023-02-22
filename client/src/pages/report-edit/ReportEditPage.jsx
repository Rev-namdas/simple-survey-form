import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import LineChart from '../chart/linechart/LineChart';
import PieChart from '../chart/piechart/PieChart';
import "../chart/chartbox.css"
import ApexCharts from "apexcharts";
import pptxgen from "pptxgenjs";
import { getReport, updateReport } from '../../api/apiRequest';

export default function ReportEditPage() {
  const { state } = useLocation()
  const [chartSelection, setChartSelection] = useState([])
  let chartImgData = []
  const [reportDetails, setReportDetails] = useState({})
  const reportId = useRef()

  const fetchReport = async () => {
	const res = await getReport(state.topic_id)
	setReportDetails(JSON.parse(res.list))
	reportId.current = res.id
  }

  useEffect(() => {
    window.scrollTo(0,0)

    const arr = state?.questions.map(_ => '1')
    setChartSelection(arr)

	if(state?.topic_id){
		fetchReport()
	}
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

  const handleUserReportDetails = (e, index) => {
    setReportDetails(prev => ({
      ...prev,
      [index]: e.target.value
    }))
  }

  const handleGenerate = async () => {
    const payload = {
      id: reportId.current,
      report: JSON.stringify(reportDetails)
    }

    const res = await updateReport(payload)
    console.log(res.message);

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
        x: 0, y: '10%', w: '100%', h: '10%', 
        align: "center", fontSize: 12, bold: true
      })

      slide.addImage({ data: each, x: 2.5, y: 1.3, w: '50%', h: '45%' })

      slide.addText(
        reportDetails[index] || "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus molestias explicabo repudiandae dicta architecto hic laboriosam mollitia tenetur numquam nesciunt, rerum, nisi placeat voluptatibus nihil vitae at blanditiis, eaque culpa iusto id iste! Incidunt cum odit tenetur, assumenda placeat natus, corrupti voluptatem porro a omnis cupiditate quasi beatae delectus rerum?", {
        x: '10%', y: '70%', w: '80%', h: '30%', 
        align: "justify", valign: "top", fontSize: 12
      })
    })
    
    pres.writeFile({ fileName: "Report" });
  }
  
  return (
    <>
      <br />

      <button onClick={handleGenerate}>Generate</button>
      <button onClick={handleDownload}>Download</button>
      
      {state?.questions?.map((each, index) => (
        <div key={index} className="chart-box">
          <div>
            <textarea 
              id="" 
              cols="100" 
              rows="5" 
              value={reportDetails[index]}
              onChange={(e) => handleUserReportDetails(e, index)}
            ></textarea>
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