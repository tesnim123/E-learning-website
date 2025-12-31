const express = require("express");
const router = express.Router();
const { getCourses, getCourse, enrollCourse } = require("../controllers/coursesController");

router.get("/", getCourses);
router.get("/:id", getCourse);
router.post("/enroll", enrollCourse);

module.exports = router;
