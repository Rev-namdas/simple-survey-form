const { setNewReport, fetchReportById, updateReport, checkIfReportExistById, deleteReportById } = require("./report.controllers")

const router = require("express").Router()

module.exports = (app) => {
	router.post("/save", setNewReport)
	router.get("/fetch/:id", fetchReportById)
	router.patch("/update", updateReport)
	router.get("/check-exist/:id", checkIfReportExistById)
	router.delete("/delete/:id", deleteReportById)

	app.use('/api/report', router)
} 