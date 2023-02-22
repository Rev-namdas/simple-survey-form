const db = require("../config/dbConfig")

const setNewReport = (req, res) => {
	const { topic_id, report } = req.body

	const sql = `
		INSERT INTO reports(topic_id, report)
		VALUES (?,?)
	`

	db.query(sql, [topic_id, report], (err, result) => {
		if (err) {
            console.log("❌ Error:", err.message);
            return res.send({
                flag: "FAIL",
                message: "Something went wrong"
            });
        }

		if (result.affectedRows > 0 && result.insertId !== null) {
			console.log(result);
            return res.send({
                flag: "SUCCESS",
                message: "Inserted Successfully"
            });
        }
	})
}

const fetchReportById = (req, res) => {
	const { id } = req.params

	const sql = `SELECT id, report FROM reports WHERE topic_id = ?`

	db.query(sql, parseInt(id), (err, result) => {
		if (err) {
            console.log("❌ Error:", err.message);
            return res.send({
                flag: "FAIL",
                message: "Something went wrong"
            });
        }

		return res.send({
			flag: "SUCCESS",
			list: result[0].report,
			id: result[0].id
		});
	})
}

const updateReport = (req, res) => {
	const { report, id } = req.body

	const sql = `UPDATE reports SET report = ? WHERE id = ?`

	db.query(sql, [report, parseInt(id)], (err, result) => {
		if (err) {
            console.log("❌ Error:", err.message);
            return res.send({
                flag: "FAIL",
                message: "Something went wrong"
            });
        }

		if (result.affectedRows > 0 && result.insertId !== null) {
			console.log(result);
            return res.send({
                flag: "SUCCESS",
                message: "Update Successfully"
            });
        }
	})
}

module.exports = {
	setNewReport, fetchReportById, updateReport
}