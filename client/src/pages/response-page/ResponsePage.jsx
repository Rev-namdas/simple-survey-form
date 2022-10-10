import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getTopicList } from '../../api/apiRequest'

export default function ResponsePage() {
	const [topicList, setTopicList] = useState([])

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
				<Link to={`/admin/responses/list/${each.id}`} state={{ topic: each.topic }}>{ each.topic }</Link>
			</div>
		))}
	</>
  )
}
