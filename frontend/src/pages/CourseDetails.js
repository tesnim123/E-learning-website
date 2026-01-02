import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ← ajoute useNavigate
import API from "../api";
import "./CourseDetails.css";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ← hook pour navigation
  const [course, setCourse] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    API.get(`/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.error(err));

    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
  }, [id]);

  const enroll = () => {
    const userId = localStorage.getItem("userId");
    API.post("/courses/enroll", { courseId: id, userId })
      .then(() => alert("Inscrit !"))
      .catch(() => alert("Erreur lors de l'inscription"));
  };

  // fonction pour revenir en arrière
  const goBack = () => navigate("/courses");

  if (!course) return <div className="loading">Chargement...</div>;

  return (
    <div className="details-container">
      <header className="details-header">
  {/* Bouton flèche */}
  <button className="back-button" onClick={() => navigate("/courses")}>
    &#8592;
  </button>

  {/* Texte “Détails” */}
  <h1 className="details-title">Détails du cours</h1>

  {/* Nom utilisateur */}
  {userName && <div className="user-name">{userName}</div>}
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
