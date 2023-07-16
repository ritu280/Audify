import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await signIn(email, password);
      navigate("/home");
    } catch (e) {
      setErr(e.message);
      alert(e.message);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-white mb-20 font-bold text-6xl font-serif">
        Audify
      </h1>
      <form
        className="flex flex-col justify-center"
        onSubmit={handleSubmit}
      >
        {/* Email */}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Your Email"
          id="email"
          name="email"
          className="bg-gray-800/25 py-2 rounded-full px-6 mb-4 text-white placeholder-gray-500 focus:outline-none"
        />
        {/* Password*/}
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Your Password"
          id="password"
          name="password"
          className="bg-gray-800/25 py-2 rounded-full px-6 mb-4 text-white placeholder-gray-500 focus:outline-none"
        />
        <button
          type="submit"
          className="text-white text-center bg-transparent hover:bg-white hover:text-black rounded-full py-2 px-8 border border-white focus:outline-none"
        >
          Sign In
        </button>
      </form>
      <div className="mt-12">
        <p className="text-gray-500">New to Audify?</p>
        <Link to="/signup">
          <button className="border-white text-white bg-transparent border hover:bg-white hover:text-black rounded-full py-2 px-8 focus:outline-none">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
 