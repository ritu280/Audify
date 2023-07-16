import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContextProvider, UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Import custom CSS file for styling

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const { createUser } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await createUser(email, password);
      navigate("/home");
    } catch (error) {
      setErr(error.message);
      alert(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="logo">Audify</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label className="signup-label">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Your Name"
          id="name"
          name="name"
          className="signup-input"
        />
        <label className="signup-label">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Your Email"
          id="email"
          name="email"
          className="signup-input"
        />
        <label className="signup-label">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Your Password"
          id="password"
          name="password"
          className="signup-input"
        />
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
