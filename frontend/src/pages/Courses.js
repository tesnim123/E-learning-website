import React, { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";
import "./Courses.css"; // fichier CSS dédié

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Récupère les cours
    API.get("/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));

    // Récupère le nom de l'utilisateur depuis localStorage (ou tu peux le stocker après login)
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
  }, []);

  return (
    <div className="courses-container">
      <header className="courses-header">
        <h1>Liste des cours</h1>
        {userName && <div className="user-name">Bonjour, {userName}</div>}
      </header>
      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <img
              src={`/assets/${course.image_url}`}
              alt={course.title}
              className="course-image"
            />
            <h2 className="course-title">{course.title}</h2>
            <p className="course-desc">{course.description}</p>
            <Link to={`/courses/${course.id}`} className="details-button">
              Voir détails
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
