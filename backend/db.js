const mysql = require("mysql2");
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST ,
    user: process.env.DB_USER ,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE ,
    port: process.env.PORT
});

// tester la connexion
db.connect(function(err) {
    if (err) {
        console.error("Erreur de connexion MySQL:", err);
    } else {
        console.log("Connecté à MySQL !");
    }
});

module.exports = db;
