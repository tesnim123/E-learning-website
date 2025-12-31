import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // On va créer ce fichier CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      console.log(res.data);
      localStorage.setItem("userName",res.data.name);
      navigate("/");
    } catch (err) {
      alert("Erreur login");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Se connecter</button>
        </form>
        <p className="register-text">
          Pas encore de compte?{" "}
          <span onClick={() => navigate("/register")}>Inscrivez-vous</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
