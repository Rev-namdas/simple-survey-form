import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function ResponseDetails() {
	const params = useParams()

	const fetchData = async () => {
		console.log(params.id);
	}

	useEffect(() => {
		fetchData()
	}, 
	// eslint-disable-next-line
	[])
	

  return (
	<div>ResponseDetails</div>
  )
}
