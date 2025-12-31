const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
    const { name, email, password } = req.body;
    const hashed = bcrypt.hashSync(password, 10);

    db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
        [name, email, hashed], (err, result) => {
            if(err) return res.status(500).json(err);
            res.json({ message: "Utilisateur créé!" });
        });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
        if(err) return res.status(500).json(err);
        if(results.length === 0) return res.status(400).json({ message: "Email introuvable" });

        const user = results[0];
        const valid = bcrypt.compareSync(password, user.password);
        if(!valid) return res.status(400).json({ message: "Mot de passe incorrect" });

        const token = jwt.sign({ id: user.id }, "SECRET_KEY", { expiresIn: "1h" });
        res.json({
  token,
  userId: user.id,
  name: user.name // <- ajouter ceci
});

    });
};
