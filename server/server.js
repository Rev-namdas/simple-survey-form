const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path")
const db = require("./apps/config/dbConfig");

const app = express();
app.use(express.static(path.join(__dirname, '../public_html/survey-react')));
app.use(morgan("dev"))
app.use(cors({ origin: "*" }));
app.use(express.json({ extended: true, limit: "512MB" }))
app.use(express.urlencoded({ extended: true, limit: "512MB" }))

app.get("/", (req, res) => {
    return res.send("CONNECTED");
});

require("./apps/forms/forms.routes")(app)
require("./apps/answers/answers.routes")(app)
require("./apps/reports/report.routes")(app)

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../public_html/survey-react/index.html'));
});

app.listen(5050, () => {
    console.log("✅ Server Connected !");
    db.connect((err) => {
        if (err) {
            console.log("❌ Error: ", err.message);
        } else {
            console.log("📌 DB Connected !");
        }
    });
});