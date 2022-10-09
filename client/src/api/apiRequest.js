import axios from "axios"
import { apiEndpoints } from "./endpoints"

export const createForm = async (payload) => {
	try {
		const res = await axios.post(apiEndpoints.create_form, payload)
		return res.data
	} catch (error) {
		console.log(error.message);
		return null
	}
}

export const getForm = async (payload) => {
	try {
		const res = await axios.get(apiEndpoints.get_form + `/${payload}`)
		return res.data[0]
	} catch (error) {
		console.log(error.message);
		return null
	}
}

export const saveForm = async (payload) => {
	try {
		const res = await axios.post(apiEndpoints.save_form, payload)
		return res.data
	} catch (error) {
		console.log(error.message);
		return null
	}
}