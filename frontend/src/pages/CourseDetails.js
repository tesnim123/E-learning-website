import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import "./CourseDetails.css";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Récupération du cours
    API.get(`/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.error(err));

    // Récupération du nom utilisateur depuis localStorage
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
  }, [id]);

  const enroll = () => {
    const userId = localStorage.getItem("userId");
    API.post("/courses/enroll", { courseId: id, userId })
      .then(() => alert("Inscrit !"))
      .catch(() => alert("Erreur lors de l'inscription"));
  };

  if (!course) return <div className="loading">Chargement...</div>;

  return (
    <div className="details-container">
      <header className="details-header">
        <h1>Détails du cours</h1>
        {userName && <div className="user-name">Bonjour, {userName}</div>}
      </header>

      <div className="course-card">
        <img
          src={`/assets/${course.image_url}`}
          alt={course.title}
          className="course-image"
        />
        <h2 className="course-title">{course.title}</h2>
        <p className="course-desc">{course.description}</p>
        <button className="enroll-button" onClick={enroll}>
          S'inscrire
        </button>
      </div>
    </div>
  );
};

export default CourseDetails;
