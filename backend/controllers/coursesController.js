const db = require("../db");

exports.getCourses = (req, res) => {
    db.query("SELECT * FROM courses", (err, results) => {
        if(err) return res.status(500).json(err);
        res.json(results);
    });
};

exports.getCourse = (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM courses WHERE id = ?", [id], (err, results) => {
        if(err) return res.status(500).json(err);
        if(results.length === 0) return res.status(404).json({ message: "Cours introuvable" });
        res.json(results[0]);
    });
};

exports.enrollCourse = (req, res) => {
    const { courseId, userId } = req.body;
    db.query("INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)", [userId, courseId], 
        (err, result) => {
            if(err) return res.status(500).json(err);
            res.json({ message: "Inscription réussie!" });
        });
};
