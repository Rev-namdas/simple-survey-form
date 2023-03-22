import axios from "axios"
import { apiEndpoints } from "./endpoints"

// const client = axios.create({ baseURL: "http://localhost:1111" })

export const checkUrlExists = async (payload) => {
	try {
		const res = await axios.post(apiEndpoints.check_url, payload)
		return res.data
	} catch (error) {
		console.log(error.message);
		return null
	}
}

export const createForm = async (payload) => {
	try {
		const res = await axios.post(apiEndpoints.create_form, payload)
		return res.data
	} catch (error) {
		console.log(error.message);
		return null
	}
}

export const updateForm = async (payload) => {
	try {
		const res = await axios.patch(apiEndpoints.update_form, payload)
		return res.data
	} catch (error) {
		console.log(error.message);
		return null
	}
}

export const getForm = async (payload) => {
	try {
		const res = await axios.get(apiEndpoints.get_form + `${payload}`)
		return res.data[0]
	} catch (error) {
		console.log(error.message);
		return null
	}
}

export const saveAnswers = async (payload) => {
	try {
		const res = await axios.post(apiEndpoints.save_answers, payload)
		return res.data
	} catch (error) {
		console.log(error.message);
		return null
	}
}

export const saveMultipleAnswers = async (payload) => {
	try {
		const res = await axios.post(apiEndpoints.save_multiple_answers, payload)
		return res.data
	} catch (error) {
		console.log(error.message);
		return null
	}
}

export const getTopicList = async () => {
	try {
		const res = await axios.get(apiEndpoints.topic_list)
		return res.data
	} catch (error) {
		console.log(error.message);
		return null
	}
}

export const getTopicDetailsById = async (payload) => {
	try {
		const res = await axios.get(apiEndpoints.topic_details_by_id + payload)
		return res.data
	} catch (error) {
		console.log(error.message);
		return null
	}
}

export const getTopicDetailsByIdPage = async (payload) => {
	try {
		const res = await axios.get(apiEndpoints.topic_details_by_id_page + payload)
		return res.data
	} catch (error) {
		console.log(error.message);
		return null
	}
}

export const getTopicQuestionsById = async (payload) => {
	try {
		const res = await axios.get(apiEndpoints.topic_questions_by_id + payload)
		return res.data
	} catch (error) {
		console.log(error.message);
		return null
	}
}

export const saveReport = async (payload) => {
	try {
		const res = await axios.post(apiEndpoints.save_report, payload)
		return res.data
	} catch (error) {
		console.log(error.message);
		return null
	}
}

export const getReport = async (payload) => {
	try {
		const res = await axios.get(apiEndpoints.get_report + payload)
		return res.data
	} catch (error) {
		console.log(error.message);
		return null
	}
}

export const updateReport = async (payload) => {
	try {
		const res = await axios.patch(apiEndpoints.update_report, payload)
		return res.data
	} catch (error) {
		console.log(error.message);
		return null
	}
}

export const checkIfReportExist = async (payload) => {
	try {
		const res = await axios.get(apiEndpoints.check_report_exist + payload)
		return res.data
	} catch (error) {
		console.log(error.message);
		return null
	}
}

export const deleteReport = async (payload) => {
	try {
		const res = await axios.delete(apiEndpoints.delete_report + payload)
		return res.data
	} catch (error) {
		console.log(error.message);
		return null
	}
}