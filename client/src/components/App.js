import React, { useEffect, useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Home from "../components/Home";
import Submit from "../components/Submit";
import Login from "../components/Login";
import ProjectCollection from "../components/ProjectCollection";
import ProjectPage from "../components/ProjectPage";
import { UserContext } from "../components/UserProvider";

function App() {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useContext(UserContext); // using the useContext hook here

  useEffect(() => {
    fetch("/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  console.log(user); // logging the user information from the context

  return (
    <div className="App">
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/explore"
          element={<ProjectCollection projects={projects} />}
        />
        <Route path="/submit" element={<Submit />} />
        <Route path="/projects/:projectId" element={<ProjectPage />} />
      </Routes>
    </div>
  );
}

export default App;