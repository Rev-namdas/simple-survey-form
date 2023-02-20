import axios from "axios"
import { apiEndpoints } from "./endpoints"

const client = axios.create({ baseURL: "https://dev.mskhantrading.com/api" })
// const client = axios.create({ baseURL: "http://192.168.110.138:1111/api" })

export const checkUrlExists = async (payload) => {
	try {
		const res = await client.post(apiEndpoints.check_url, payload)
		return res.data
	} catch (error) {
		console.log(error.message);
		return null
	}
}

export const createForm = async (payload) => {
	try {
		const res = await client.post(apiEndpoints.create_form, payload)
		return res.data
	} catch (error) {
		console.log(error.message);
		return null
	}
}

export const updateForm = async (payload) => {
	try {
		const res = await client.patch(apiEndpoints.update_form, payload)
		return res.data
	} catch (error) {
		console.log(error.message);
		return null
	}
}

export const getForm = async (payload) => {
	try {
		const res = await client.get(apiEndpoints.get_form + `${payload}`)
		return res.data[0]
	} catch (error) {
		console.log(error.message);
		return null
	}
}

export const saveAnswers = async (payload) => {
	try {
		const res = await client.post(apiEndpoints.save_answers, payload)
		return res.data
	} catch (error) {
		console.log(error.message);
		return null
	}
}

export const saveMultipleAnswers = async (payload) => {
	try {
		const res = await client.post(apiEndpoints.save_multiple_answers, payload)
		return res.data
	} catch (error) {
		console.log(error.message);
		return null
	}
}

export const getTopicList = async () => {
	try {
		const res = await client.get(apiEndpoints.topic_list)
		return res.data
	} catch (error) {
		console.log(error.message);
		return null
	}
}

export const getTopicDetailsById = async (payload) => {
	try {
		const res = await client.get(apiEndpoints.topic_details_by_id + payload)
		return res.data
	} catch (error) {
		console.log(error.message);
		return null
	}
}

export const getTopicDetailsByIdPage = async (payload) => {
	try {
		const res = await client.get(apiEndpoints.topic_details_by_id_page + payload)
		return res.data
	} catch (error) {
		console.log(error.message);
		return null
	}
}

export const getTopicQuestionsById = async (payload) => {
	try {
		const res = await client.get(apiEndpoints.topic_questions_by_id + payload)
		return res.data
	} catch (error) {
		console.log(error.message);
		return null
	}
}