const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./apps/config/dbConfig");

const app = express();
app.use(morgan("dev"))
app.use(cors({ origin: "*" }));
app.use(express.json({ extended: true, limit: "512MB" }))
app.use(express.urlencoded({ extended: true, limit: "512MB" }))

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

require("./apps/forms/forms.routes")(app)
require("./apps/answers/answers.routes")(app)
require("./apps/reports/report.routes")(app)