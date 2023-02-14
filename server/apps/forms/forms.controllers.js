const db = require("../config/dbConfig");

const checkIfTopicExists = (req, res) => {
    const { url } = req.body

    const sql = `SELECT id FROM forms WHERE url LIKE ?`

    db.query(sql, url, (err, result) => {
        if(err){
            console.log("❌ Error:", err.message);
        }

        if(result.length > 0){
            return res.send({ flag: 'FAIL', msg: "Url Name Already Exists !" })
        }

        return res.send({
            flag: 'SUCCESS',
            msg: "You can proceed"
        })
    })
}

const setCreateNewForm = (req, res) => {
    const { topic_name, url, json_data } = req.body;

    const sql = "INSERT INTO forms(topic, url, questions) VALUES (?, ?, ?)";

    db.query(sql, [topic_name, url, json_data], (err, result) => {
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

const updateCreatedForm = (req, res) => {
    const { topic_id, json_data, topic_name } = req.body;

    const sql = `
        UPDATE forms 
        SET questions = ?, topic = ? 
        WHERE id = ?
    `;

    db.query(sql, [json_data, topic_name, topic_id], (err, result) => {
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
    });
}

const getFormByUrl = (req, res) => {
    const { name } = req.params;

    const sql = "SELECT * FROM forms WHERE url = ? LIMIT 1";

    db.query(sql, name, (err, result) => {
        if (err) {
            console.log("❌ Error:", err.message);
            return res.send("Something went wrong");
        }

        if (result) {
            return res.send(result);
        }
    });
}

const getTopicList = (req, res) => {
    const sql = "SELECT id, topic, url FROM forms"

    db.query(sql, (err, result) => {
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

const getQuestionsById = (req, res) => {
    const id = req.params.id

    const sql = "SELECT questions FROM forms WHERE id = ?"

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

module.exports = {
	checkIfTopicExists, setCreateNewForm, updateCreatedForm,
	getFormByUrl, getTopicList, getQuestionsById
}