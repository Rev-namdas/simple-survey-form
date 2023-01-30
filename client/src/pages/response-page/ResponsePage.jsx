import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTopicList } from '../../api/apiRequest'
import "./response.css"

export default function ResponsePage() {
	const [topicList, setTopicList] = useState([])
	const navigate = useNavigate()

	const fetchData = async () => {
		const res = await getTopicList()
		setTopicList(res);
	}
	
	useEffect(() => {
		fetchData()
	}, 
	// eslint-disable-next-line
	[])
	

  return (
	<>
		<h3 className='response__title'>Response List</h3>
		<table className='response__table'>
			<thead className='response__table-head'>
				<tr>
					<th className='response__table-th'>Sl</th>
					<th className='response__table-th'>Topic Name</th>
					<th className='response__table-th'>Url</th>
					<th className='response__table-th'>Action</th>
				</tr>
			</thead>
			<tbody>
				{topicList.map((each, index) => (
					<tr key={index} className='response__table-row'>
						<td className='response__table-td response__table-text-center'>{ index + 1 }</td>
						<td className='response__table-td'>{ each.topic }</td>
						<td className='response__table-td'>{ each.url }</td>
						<td className='response__table-td response__table-text-center'>
							<button
								className='response__table-btn response__table-btn-response'
								onClick={() => navigate(`/admin/responses/list/${each.id}`, 
								{ state: { topic: each.topic }})}
							>
								Responses
							</button>
							
							<button
								className='response__table-btn response__table-btn-edit'
								onClick={() => navigate(`/edit/${each.url}`, 
								{ state: { topic: each.url, topic_id: each.id }})}
							>
								Edit
							</button>

							<button
								className='response__table-btn response__table-btn-view'
								onClick={() => navigate(`/view/${each.url}`, 
								{ state: { topic: each.url, topic_id: each.id }})}
							>
								View
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	</>
  )
}
