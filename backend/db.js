const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ctym",
    database: "elearning"
});

db.connect(err => {
    if (err) throw err;
    console.log("Connecté à la base MySQL!");
});

module.exports = db;
