import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTopicList } from '../../api/apiRequest'

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
		<div>ResponsePage</div> <br />
		<ol>
		{topicList.map((each, index) => (
			<li key={index}>
				<span>{ each.topic } === { each.url }</span>

				<button 
					onClick={() => navigate(`/admin/responses/list/${each.id}`, 
					{ state: { topic: each.topic }})}
				>
					Responses
				</button>
				
				<button 
					onClick={() => navigate(`/edit/${each.url}`, 
					{ state: { topic: each.url, topic_id: each.id }})}
				>
					Edit
				</button>

				<button 
					onClick={() => navigate(`/view/${each.url}`, 
					{ state: { topic: each.url, topic_id: each.id }})}
				>
					View
				</button>
			</li>
		))}
		</ol>
	</>
  )
}
