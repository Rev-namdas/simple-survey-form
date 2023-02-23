import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import LineChart from '../chart/linechart/LineChart';
import PieChart from '../chart/piechart/PieChart';
import "../chart/chartbox.css"
import ApexCharts from "apexcharts";
import pptxgen from "pptxgenjs";
import { saveReport } from '../../api/apiRequest';

export default function ReportCreatePage() {
  const { state } = useLocation()
  const [chartSelection, setChartSelection] = useState([])
  const [chartImgData, setChartImgData] = useState([])
  const [reportDetails, setReportDetails] = useState({})
  const [downloadable, setDownloadable] = useState(false)

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

  const handleUserReportDetails = (e, key) => {
    setReportDetails(prev => ({
      ...prev,
      [key]: e.target.value
    }))
  }

  const handleSave = async () => {
    const payload = {
      topic_id: state?.topic_id,
      report: JSON.stringify(reportDetails)
    }
  
    const res = await saveReport(payload)
    console.log(res.message);
  }

  const handleGenerate = async () => {
    state?.questions?.forEach((_, index) => {
      if(chartSelection[index] === '1'){
        ApexCharts.exec(`chart-pie-${index}`, "dataURI").then(({ imgURI }) => {
          setChartImgData(prev => [...prev, imgURI])
        })
      } else if(chartSelection[index] === '2'){
        ApexCharts.exec(`chart-line-${index}`, "dataURI").then(({ imgURI }) => {
          setChartImgData(prev => [...prev, imgURI])
        })
      } 
    })
    setDownloadable(true)
   }

  const handleDownload = () => {
    let pres = new pptxgen();
    let slide = pres.addSlide();

    slide.addImage({ path: "/archive-logo.png", x: '42%', y: 1, w: "17%", h: "11%" })
    slide.addText(
      reportDetails["introduction"] || "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis deserunt quod enim, autem ea consequatur mollitia nisi vitae quas blanditiis, fugiat ut earum quaerat dolores beatae veniam voluptates id nam. Delectus quia rem magnam? Modi corporis, consequuntur cum minus recusandae aperiam similique ab, voluptates sint delectus eum voluptas incidunt natus debitis, quae ut. Repellendus asperiores officiis adipisci. Nobis, labore. Beatae, omnis consequuntur. Ab, neque officiis. Atque fugiat nostrum assumenda autem dicta iste corporis provident eaque nisi repudiandae nam, alias expedita doloremque porro! Quam voluptatem officia libero cupiditate sed sint optio, possimus adipisci necessitatibus. Aut est beatae dolor saepe ipsa aliquam aperiam veniam labore maxime perspiciatis ducimus, nihil fugiat libero voluptate esse laudantium dolore repudiandae, distinctio dolorum doloremque laborum. Fugit est dolor nisi dicta facere sit consequatur, commodi magni voluptatem vero officia laboriosam quia cum enim optio nobis odio exercitationem molestias excepturi animi doloribus amet? Dolores error nobis ratione! Animi saepe nostrum, earum in culpa itaque aspernatur cumque obcaecati excepturi nam, laborum laboriosam. Quae dolores, iure quidem corporis, a consectetur minima deleniti fugit illo omnis laudantium, dolorum ut dolore. Aliquid possimus obcaecati consequuntur magni dolorem quas, culpa, atque repellat perspiciatis, est dolore fugiat neque animi rem autem quis voluptatibus rerum. Quam.", {
      x: '10%', y: 2, w: '80%', h: '50%', 
      align: "justify", fontSize: 12
    })
    
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

      <button onClick={handleSave}>Save</button>
      {downloadable
      ?
        <button onClick={handleDownload}>Download</button>
      :
        <button onClick={handleGenerate}>Generate</button>
      }

      <div className="chart-box">
        <div>Introduction</div>

        <textarea 
          id="" 
          cols="100" 
          rows="5" 
          value={reportDetails["introduction"]}
          onChange={(e) => handleUserReportDetails(e, "introduction")}
        ></textarea>
      </div>
      
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

// Data URI for PDF Download
// https://codesandbox.io/s/react-datauri-stackoverflow-60110892-iryeq?file=/src/App.js