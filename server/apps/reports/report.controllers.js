const db = require("../config/dbConfig")

const setNewReport = (req, res) => {
	const { topic_id, report } = req.body

	let sql = `
		SELECT EXISTS (
			SELECT * FROM reports
			WHERE topic_id = ?
		)
		AS exist
	`

	db.query(sql, [parseInt(topic_id)], (err, result) => {
		if (err) {
            console.log("❌ Error:", err.message);
            return res.send({
                flag: "FAIL",
                message: "Something went wrong"
            });
        }

		if(result[0].exist === 1){
			console.log("📌 Error: Topic report already exists");
            return res.send({
                flag: "FAIL",
                message: "Topic report already exists"
            });
		}

		sql = `
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

const checkIfReportExistById = (req, res) => {
	const { id } = req.params 

	const sql = `
		SELECT EXISTS 
		(
			SELECT * FROM reports 
			WHERE topic_id = ?
		) 
		as exist
	`

	db.query(sql, [parseInt(id)], (err, result) => {
		if (err) {
            console.log("❌ Error:", err.message);
            return res.send({
                flag: "FAIL",
                message: "Something went wrong"
            });
        }

		return res.send({
			flag: "SUCCESS",
			message: `${result[0].exist ? "Report Exist" : "Report Doesn't Exist"}`,
			exists: result[0].exist ? true : false
		});
	})
}

const deleteReportById = (req, res) => {
	const { id } = req.params

	const sql = `DELETE FROM reports WHERE id = ?`

	db.query(sql, [parseInt(id)], (err, result) => {
		if (err) {
            console.log("❌ Error:", err.message);
            return res.send({
                flag: "FAIL",
                message: "Something went wrong"
            });
        }

		if (result.affectedRows > 0) {
			return res.send({
				flag: "SUCCESS",
				message: "Deleted Successfully"
			});
		}
	})
}

module.exports = {
	setNewReport, fetchReportById, updateReport,
	checkIfReportExistById, deleteReportById
}