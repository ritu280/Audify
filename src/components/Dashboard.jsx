import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import MenuItems from "./MenuItems";
import "material-icons/iconfont/material-icons.css";

export default function Dashboard() {
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

  const convertedFiles = []; // Replace with an array of converted files

  return (
    <div>
      {/* Navbar section */}
      <div className="text-white fixed w-full flex justify-between p-4 items-center bg-opacity-80">
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
            <li className="hover:underline underline-offset-4 px-4 py-2">
              <Link to="/home">Home</Link>
            </li>
            <li className="hover:underline underline-offset-4 px-4 py-2">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="hover:underline underline-offset-4 px-4 py-2">
              <Link to="/upload">Upload</Link>
            </li>
            <li className="hover:underline px-4 py-2">
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
      {/* Converted files */}
      <div className="h-screen flex flex-col justify-center items-center text-center bg-opacity-80">
        {convertedFiles.length > 0 ? (
          <div>
            <h2 className="text-2xl text-white font-bold mb-4">
              Your Converted Audio Files
            </h2>
            <ul className="text-white">
              {convertedFiles.map((file, index) => (
                <li key={index}>{file}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <p className="text-white text-2xl font-bold">
              You have not added any file yet.
            </p>
            <p className="text-white text-xl mt-4">
              Start converting now by{" "}
              <Link to="/upload" className="underline">
                uploading
              </Link>{" "}
              a video.
            </p>
          </div>
        )}
      </div>
      {/* Logged-in account details */}
      <div className="absolute bottom-0 right-0 text-gray-200/50">
        <p>Logged in:</p>
        <p className="text-white mb-4 mr-4 hover:underline underline-offset-1">
          {user.email}
        </p>
      </div>
    </div>
  );
}
