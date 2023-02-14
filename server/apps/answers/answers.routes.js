const { getAnswersByTopicId, getAnswersByTopicIdPaginated, setNewAnswer, setMultipleNewAnswers } = require("./answer.controllers")

const router = require("express").Router()

module.exports = (app) => {
	router.post("/save", setNewAnswer)
	router.post("/multiple-save", setMultipleNewAnswers)
	router.get("/fetch-details-by-id/:id", getAnswersByTopicId)
	router.get("/fetch-details-by-id-page/:id/:cursor", getAnswersByTopicIdPaginated)

	app.use("/api/answer", router)
}