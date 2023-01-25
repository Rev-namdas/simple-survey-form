import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
		{topicList.map((each, index) => (
			<div key={index}>
				<Link to={`/admin/responses/list/${each.id}`} state={{ topic: each.topic }}>{ each.topic } === { each.url }</Link>
				<button onClick={() => navigate(`/edit/${each.url}`, {
					state: { topic: each.url, topic_id: each.id }
				})}>Edit</button>
			</div>
		))}
	</>
  )
}
