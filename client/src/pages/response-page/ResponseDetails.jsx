import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getTopicDetailsById, getTopicQuestionsById, saveMultipleAnswers } from "../../api/apiRequest";
import * as xlsx from "xlsx"

export default function ResponseDetails() {
    const params = useParams();
	const { state: { topic } } = useLocation()
    const [responseList, setResponseList] = useState([]);
    const [questions, setQuestions] = useState([])
    const [excelResponses, setExcelResponses] = useState([])
    const [uploadBtnDisable, setUploadBtnDisable] = useState(true)
	const checkIds = useRef([])

    const fetchData = async () => {
        const res = await getTopicDetailsById(params.id);

        res.forEach((each) => {
            if (!checkIds.current.includes(each.id)) {
                setResponseList((prev) => [...prev, JSON.parse(each?.answer)]);
				// console.log('pushing', checkIds.current, each.id);
                checkIds.current.push(each.id);
            }
        });

        const ques = await getTopicQuestionsById(params.id)
        setQuestions(JSON.parse(ques[0]?.questions || {}))
    };

    const handleFileUpload = (e) => {
		e.preventDefault()

		if(e.target.files){
			setUploadBtnDisable(true)
			const reader = new FileReader()

			reader.onload = (e) => {
				const workbook = xlsx.read(e.target.result, { type: "binary" })
				const worksheetName = workbook.SheetNames[0]
				const worksheet = workbook.Sheets[worksheetName]
				const excel_json = xlsx.utils.sheet_to_json(worksheet)

                excel_json.forEach((eachRow) => {
                    const jsonObj = JSON.parse(JSON.stringify(questions))

                    jsonObj.forEach(eachQuestion => {
                        eachQuestion.answer = eachRow[eachQuestion.question] || ""
                    })
                    
                    setExcelResponses(prev => [...prev, jsonObj])
                })
			}

			reader.readAsBinaryString(e.target.files[0])
            setUploadBtnDisable(false)
		}
	}

    const handleUploadBtn = async () => {
        const data = excelResponses.map(each => {
            return [parseInt(params.id), JSON.stringify(each)]
        })

        const payload = { data }

        const res = await saveMultipleAnswers(payload)
        
        if(res.flag === 'FAIL') return alert('Something went wrong')

        window.location.reload()
    } 

	const handleDownloadExcel = () => {
		const tableToExport = document.getElementById("table-to-export")
		const wb = xlsx.utils.table_to_book(tableToExport, { sheet: "sheet1" })
		xlsx.writeFile(wb, `${topic}.xlsx`)
	}

    useEffect(
        () => {
            fetchData();
        },
        // eslint-disable-next-line
        []
    );

    return (
        <>
            <div>ResponseDetails</div>
            <div>
                <span>Select Excel: </span>
                <input type="file" name="file" id="file" onChange={handleFileUpload} />
                <button onClick={handleUploadBtn} disabled={uploadBtnDisable}>Upload</button>
            </div>
            <button onClick={() => console.log(excelResponses)}>Print</button>
            <button onClick={handleDownloadExcel}>Download</button>

            <div>Total: {responseList.length}</div>

            <table id="table-to-export">
                <thead>
                    <tr>
                        {responseList[0]?.map((each, index) => (
                            <th key={index} style={{ padding: "0.4rem 1rem", minWidth: "15rem", backgroundColor: "white" }}>{each.question}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {responseList?.map((eachResponse, index) => (
                        <tr key={index}>
                            {eachResponse.map((each, index) => (
                                <td key={index} style={{ padding: "0.4rem 1rem", minWidth: "15rem", backgroundColor: "white" }}>{each.answer}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
