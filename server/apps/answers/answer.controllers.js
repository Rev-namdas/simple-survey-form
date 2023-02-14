const db = require("../config/dbConfig");

const setNewAnswer = (req, res) => {
    const { topic_id, json_data } = req.body;

    const sql = "INSERT INTO answers(topic_id, answer) VALUES (?, ?)";

    db.query(sql, [topic_id, json_data], (err, result) => {
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
    });
}

const setMultipleNewAnswers = (req, res) => {
    const { data } = req.body;

    const sql = "INSERT INTO answers(topic_id, answer) VALUES ?";

    db.query(sql, [data], (err, result) => {
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
                message: `${result.affectedRows} Data Inserted Successfully`,
                inserted: result.affectedRows
            });
        }
    });
}

const getAnswersByTopicId = (req, res) => {
    const { id } = req.params
    
    const sql = "SELECT * FROM answers WHERE topic_id = ?"

    db.query(sql, id, (err, result) => {
        if(err){
            console.log("❌ Error:", err.message);
            return res.send({
                flag: "FAIL",
                message: "Something went wrong"
            });
        }

        if(result){
            return res.send(result)
        }
    })
}

const getAnswersByTopicIdPaginated = (req, res) => {
    const id = req.params.id
    const cursor = req.params?.cursor || 0
    const LIMIT = 50
    let totalResponses = 0
    let sql

    sql = `
        SELECT COUNT(*) AS total FROM answers
        WHERE topic_id = ?
    `

    db.query(sql, id, (err, result) => {
        if(err){
            console.log("❌ Error:", err.message);
            return res.send({
                flag: "FAIL",
                message: "Something went wrong"
            });
        }

        totalResponses = result[0].total

        if(cursor > totalResponses){
            return res.send({
                result: [],
                next: -1,
                total: totalResponses
            })
        }
    })

    
    sql = `
        SELECT * FROM answers 
        WHERE topic_id = ?
        LIMIT ?,?
    `

    db.query(sql, [id, parseInt(cursor), parseInt(LIMIT)], (err, result) => {
        if(err){
            console.log("❌ Error:", err.message);
            return res.send({
                flag: "FAIL",
                message: "Something went wrong"
            });
        }

        const nextCursor = parseInt(LIMIT) + parseInt(cursor)

        if(result){
            return res.send({
                result,
                next: nextCursor > totalResponses ? -1 : nextCursor,
                total: totalResponses
            })
        }
    })
}

module.exports = {
	setNewAnswer, setMultipleNewAnswers,
	getAnswersByTopicId, getAnswersByTopicIdPaginated
}