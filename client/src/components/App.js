import React, { useEffect, useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Home from "../components/Home";
import SideBar from "../components/SideBar";
import Login from "../components/Login";
import Profile from "./UserProfilePage";
import ProjectCollection from "../components/ProjectCollection";
import ProjectPage from "../components/ProjectPage";
import { UserContext } from "../components/UserProvider";
import { useLocation } from 'react-router-dom';

function App() {
  const [user, setUser] = useContext(UserContext); // using the useContext hook here
  const location = useLocation(); // declare the location variable using the useLocation hook
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  // console.log(user); // logging the user information from the context

  return (
    <div className="container">
      {location.pathname.startsWith('/projects/') || location.pathname.startsWith('/profile') ? <SideBar /> : null}

      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ProjectCollection projects={projects} />}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/projects/:projectId" element={<ProjectPage />} />
      </Routes>
    </div>
  );
}

export default App;