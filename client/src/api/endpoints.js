const baseUrl = "http://localhost:1111/api"

export const apiEndpoints = {
	create_form: baseUrl + "/create",
	update_form: baseUrl + "/update",
	get_form: baseUrl + "/fetch",
	save_answers: baseUrl + "/answer/save",
	save_multiple_answers: baseUrl + "/answer/multiple-save",
	topic_list: baseUrl + "/topic/list",
	topic_questions_by_id: baseUrl + '/topic/',
	topic_details_by_id: baseUrl + "/topic/details/",
	topic_details_by_id_page: baseUrl + "/topic/details-paginated/",
}