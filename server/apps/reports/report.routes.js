const { setNewReport, fetchReportById, updateReport } = require("./report.controllers")

const router = require("express").Router()

module.exports = (app) => {
	router.post("/save", setNewReport)
	router.get("/fetch/:id", fetchReportById)
	router.patch("/update", updateReport)

	app.use('/api/report', router)
} 