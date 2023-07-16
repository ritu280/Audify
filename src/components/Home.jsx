import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import MenuItems from "./MenuItems";
import "material-icons/iconfont/material-icons.css";

export default function Home() {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (error) {
      console.log(error.message);
    }
  };
  const [active, setActive] = useState(false);
  const showMenu = () => {
    setActive(!active);
  };

  return (
    <div>
      {/* Navbar section */}
      <div className="text-white fixed w-full flex justify-between p-4 items-center">
        <div className="text-2xl font-bold text-center">
          <h1 className="text-4xl">Audify</h1>
        </div>

        <nav>
          <div className="md:hidden scale-125 hover:scale-150">
            <button className="material-icons-outlined" onClick={showMenu}>
              menu
            </button>
          </div>
          <ul className="hidden md:flex gap-8 p-4 uppercase">
            <li className="hover:scale-125 hover:underline underline-offset-4 px-4 py-2">
              <Link to="/home">Home</Link>
            </li>
            <li className="hover:scale-125 hover:underline underline-offset-4 px-4 py-2">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="hover:scale-125 hover:underline underline-offset-4 px-4 py-2">
              <Link to="/upload">Upload</Link>
            </li>
            <li className="hover:scale-125 px-4 py-2">
              <button
                onClick={handleLogout}
                className="uppercase hover:underline underline-offset-4"
              >
                Logout
              </button>
            </li>
          </ul>
          <MenuItems showMenu={showMenu} active={active} />
        </nav>
      </div>
      {/* Welcome content */}
      <div className="h-screen flex flex-col justify-center items-center">
        <p className="text-white font-bold text-6xl">
          Welcome to Audify's Magic!
        </p>
        <p className="text-gray-300/70 italic text-2xl font-light mt-2 mb-6">
          Transform Your Videos into Captivating Audio Experiences
        </p>
        <p className="text-gray-200/80 text-xl mx-16 font-light px-16 italic">
        Unlock the Soundtrack of Your Videos with Audify! Convert videos to high-quality audio files in a snap. Extract captivating music, inspiring speeches, and powerful dialogues effortlessly. Audify - Transforming Videos into Audio Magic!
        </p>
        <p className="text-gray-300/70 mt-4 text-xl font-light italic mb-6">
          Start converting now and immerse yourself in the audio realm!
        </p>
        <button className="text-white/60 text-xl bg-transparent border border-spacing-7 hover:bg-white hover:text-black rounded-full px-6 py-4 uppercase hover:text-2xl">
          <Link to="/upload">Begin the Conversion</Link>
        </button>
      </div>
      {/* Logged-in account details */}
      <div className="absolute bottom-0 right-0">
        <p className="text-gray-200/50">Logged in as:</p>
        <p className="text-white mb-4 mr-4 hover:underline underline-offset-1">
          {user.email}
        </p>
      </div>
    </div>
  );
}
