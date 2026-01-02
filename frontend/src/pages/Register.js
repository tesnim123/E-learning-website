import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // fichier CSS dédié

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { name, email, password });
      alert("Inscription réussie!");
      navigate("/");
    } catch (err) {
      alert("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Inscription</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom</label>
            <input
              type="text"
              placeholder="Entrez votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">S'inscrire</button>
        </form>
        <p className="login-text">
          Déjà inscrit ?{" "}
          <span onClick={() => navigate("/login")}>Connectez-vous</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
