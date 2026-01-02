import React, { useEffect, useState } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";
import "./Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));

    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <div className="courses-container">
      <header className="courses-header">
        <h1>Liste des cours</h1>
        {userName && (
          <div className="user-info">
            <span className="user-name"> {userName}</span>
            <button className="logout-button" onClick={handleLogout}>
              Déconnexion
            </button>
          </div>
        )}
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
