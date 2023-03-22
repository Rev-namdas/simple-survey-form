const mysql = require("mysql");

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "serveymedia_admin",
//     password: "]3)QByHqXKP#",
//     database: "serveymedia_db"
// });
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "interactive_form",
});

module.exports = db