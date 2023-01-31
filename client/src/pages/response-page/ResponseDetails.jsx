import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getTopicDetailsByIdPage, getTopicQuestionsById, saveMultipleAnswers } from "../../api/apiRequest";
import * as xlsx from "xlsx"

export default function ResponseDetails() {
    const params = useParams();
	const { state: { topic } } = useLocation()
    const [responseList, setResponseList] = useState([]);
    const [responseLength, setResponseLength] = useState(0)
    const [questions, setQuestions] = useState([])
    const [excelResponses, setExcelResponses] = useState([])
    const [uploadBtnDisable, setUploadBtnDisable] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [responseMsg, setResponseMsg] = useState("")
    const [downloadBtnDisable, setDownloadBtnDisable] = useState(true)
	const checkIds = useRef([])

    let totalInserted = 0
    let cursor = 0

    const fetchResponses = async () => {
        setIsLoading(true)
        const payload = `${params.id}/${cursor}`
        
        const res = await getTopicDetailsByIdPage(payload);
        cursor = res?.next || 0
        setResponseLength(res?.total)
        if(res?.next === -1){
            setDownloadBtnDisable(false)
        }

        res?.result?.forEach((each) => {
            if (!checkIds.current.includes(each.id)) {
                setResponseList((prev) => [...prev, JSON.parse(each?.answer)]);
                checkIds.current.push(each.id);
            }
        });
        setIsLoading(false)
    };
    
    const fetchQuestions = async () => {
        setIsLoading(true)
        const ques = await getTopicQuestionsById(params.id)
        setQuestions(JSON.parse(ques[0]?.questions || {}))
        setIsLoading(false)
    }

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
                setUploadBtnDisable(false)
			}

			reader.readAsBinaryString(e.target.files[0])
		}
	}

    const handleUploadBtn = async () => {
        setResponseMsg("Processing...")
        setUploadBtnDisable(true)

        const data = excelResponses.map(each => {
            return [parseInt(params.id), JSON.stringify(each.map(eachRow => (
                { id: eachRow.id, answer: eachRow.answer }
            )))]
        })

        const sliceUpto = 200
        const maxLength = Math.ceil(data.length / sliceUpto)
        let startFrom = 0
        let endTo = sliceUpto

        for (let index = 0; index < maxLength; index++) {
            const payload = { data: data.slice(startFrom, (data.length < endTo ? data.length : endTo)) }

            const res = await saveMultipleAnswers(payload)
            
            if(res.flag === 'FAIL') return alert('Something went wrong')
            if(res.flag === 'SUCCESS') {
                setResponseMsg(prev => prev += "...")
                totalInserted += res.inserted
            }
            startFrom = endTo
            endTo += sliceUpto
        }

        alert(`Total Inserted: ${totalInserted}`)
        window.location.reload()
    } 

	const handleDownloadExcel = () => {
		const tableToExport = document.getElementById("table-to-export")
		const wb = xlsx.utils.table_to_book(tableToExport, { sheet: "sheet1" })
		xlsx.writeFile(wb, `${topic}.xlsx`)
	}

    useEffect(
        () => {
            fetchResponses();
            fetchQuestions();
            
            let fetching = false
            async function trackScroll(e){
                const {scrollHeight, scrollTop, clientHeight} = e.target.scrollingElement

                if(cursor >= 0 && !fetching && (scrollHeight - scrollTop <= clientHeight)){
                    fetching = true
                    await fetchResponses()
                    fetching = false
                }
            }

            document.addEventListener('scroll', trackScroll)

            return () => document.removeEventListener('scroll', trackScroll)
        },
        // eslint-disable-next-line
        []
    );

    return (
        <>
            <div className="response__btn-header">
                <div className="response__btn-header-title">Total Responses: {responseLength} {downloadBtnDisable.toString()}</div>

                <div>
                    <span>Select Excel: </span>
                    <input type="file" name="file" id="file" onChange={handleFileUpload} />
                    <button onClick={handleUploadBtn} disabled={uploadBtnDisable}>Upload</button>
                </div>
            </div>

            {responseMsg.length > 0 && <div>{responseMsg}</div>}

            <table id="table-to-export" className="response-details__table">
                <thead className="response-details__table-head">
                    <tr>
                        <th className="response-details__table-th">Sl</th>
                        {questions.map((each, quesIndex) => (
                            <th 
                                key={quesIndex}
                                className="response-details__table-th"
                            >
                                {each.question}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {responseList?.map((eachResponse, index) => (
                        <tr key={index} className="response-details__table-row">
                            <td className="response-details__table-td">{ index + 1 }</td>
                            {eachResponse.map((each, responseIndex) => (
                                <td key={responseIndex} className="response-details__table-td">{each.answer}</td>
                            ))}
                        </tr>
                    ))}
                    {isLoading && <tr><div>Loading More...</div></tr>}
                </tbody>
            </table>
            <button 
                className="response__btn-header-download" 
                onClick={handleDownloadExcel}
                disabled={downloadBtnDisable}
            >
                Download
            </button>
            <br />
        </>
    );
}
