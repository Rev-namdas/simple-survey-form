import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getTopicDetailsById } from "../../api/apiRequest";
import * as xlsx from "xlsx"

export default function ResponseDetails() {
    const params = useParams();
	const { state: { topic } } = useLocation()
    const [responseList, setResponseList] = useState([]);
	const checkIds = useRef([])

    const fetchData = async () => {
		console.log('fetching');
        const res = await getTopicDetailsById(params.id);

        res.forEach((each) => {
            if (!checkIds.current.includes(each.id)) {
                setResponseList((prev) => [...prev, JSON.parse(each?.answer)]);
				console.log('pushing', checkIds.current, each.id);
                checkIds.current.push(each.id);
            }
        });
    };

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
            <button onClick={() => console.log(responseList)}>Print</button>
            <button onClick={handleDownloadExcel}>Download</button>

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
