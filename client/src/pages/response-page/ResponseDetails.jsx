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
	const checkIds = useRef([])

    let totalInserted = 0
    let cursor = 0

    const fetchResponses = async () => {
        setIsLoading(true)
        // const res = await getTopicDetailsById(params.id);
        const payload = `${params.id}/${cursor}`
        
        const res = await getTopicDetailsByIdPage(payload);
        cursor = res?.next || 0
        setResponseLength(res?.total)

        res?.result?.forEach((each) => {
            if (!checkIds.current.includes(each.id)) {
                setResponseList((prev) => [...prev, JSON.parse(each?.answer)]);
				// console.log('pushing', checkIds.current, each.id);
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
            return [parseInt(params.id), JSON.stringify(each)]
        })

        const sliceUpto = 200
        const maxLength = Math.ceil(data.length / sliceUpto)
        let startFrom = 0
        let endTo = sliceUpto

        console.log('total', data.length);
        console.log('len', maxLength);
        for (let index = 0; index < maxLength; index++) {
            const payload = { data: data.slice(startFrom, (data.length < endTo ? data.length : endTo)) }
    
            console.log('range', startFrom, (data.length < endTo ? data.length : endTo));
            console.log(payload);
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
            <div>ResponseDetails</div>
            <div>
                <span>Select Excel: </span>
                <input type="file" name="file" id="file" onChange={handleFileUpload} />
                <button onClick={handleUploadBtn} disabled={uploadBtnDisable}>Upload</button>
            </div>
            <button onClick={() => console.log(responseList)}>Print</button>
            <button onClick={handleDownloadExcel}>Download</button>

            <div>Total: {responseLength}</div>

            {responseMsg.length > 0 && <div>{responseMsg}</div>}

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
                            {eachResponse.map((each, responseIndex) => (
                                <td key={responseIndex} style={{ padding: "0.4rem 1rem", minWidth: "15rem", backgroundColor: "white" }}>{each.answer}</td>
                            ))}
                        </tr>
                    ))}
                    {isLoading && <tr><div></div></tr>}
                </tbody>
            </table>
            <br />
        </>
    );
}
