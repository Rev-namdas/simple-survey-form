const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const morgan = require("morgan")

const app = express();
app.use(morgan("tiny"))
app.use(cors({ origin: "*" }));
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "interactive_form",
});

app.listen(1111, () => {
    console.log("✅ Server Conected !");
    db.connect((err) => {
        if (err) {
            console.log("Error: ", err.message);
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

app.get("/api/fetch/:name", (req, res) => {
    const { name } = req.params;

    const sql = "SELECT * FROM forms WHERE url = ?";

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