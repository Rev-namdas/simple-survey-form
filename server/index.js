const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const morgan = require("morgan")

const app = express();
app.use(morgan("tiny"))
app.use(cors({ origin: "*" }));
app.use(express.json({ extended: true, limit: "512MB" }))
app.use(express.urlencoded({ extended: true, limit: "512MB" }))

const db = mysql.createConnection({
    // connectionLimit: 5,
    host: "localhost",
    user: "root",
    password: "",
    database: "interactive_form",
});

app.listen(1111, () => {
    console.log("✅ Server Connected !");
    db.connect((err) => {
        if (err) {
            console.log("❌ Error: ", err.message);
        } else {
            console.log("📌 DB Connected !");
        }
    });
});

app.get("/", (req, res) => {
    return res.send("CONNECTED");
});

app.post("/api/create", (req, res) => {
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
});

app.patch("/api/update", (req, res) => {
    const { topic_id, json_data } = req.body;

    const sql = "UPDATE forms SET questions = ? WHERE id = ?";

    db.query(sql, [json_data, topic_id], (err, result) => {
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
});

app.get("/api/fetch/:name", (req, res) => {
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
});

app.get("/api/topic/list", (req, res) => {
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
})

app.get("/api/topic/:id", (req, res) => {
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
})

app.get("/api/topic/details/:id", (req, res) => {
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
})

app.get("/api/topic/details-paginated/:id/:cursor", (req, res) => {
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
})

app.post("/api/answer/save", (req, res) => {
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
});

app.post("/api/answer/multiple-save", (req, res) => {
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
});