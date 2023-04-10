import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Home from "../components/Home";
import Submit from "../components/Submit";
import Login from "../components/Login";
import ProjectCollection from "../components/ProjectCollection";
import ProjectPage from "../components/ProjectPage";




function App() {
  
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  useEffect(() => {
    fetch("/projects")       // link for the authors DB
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);
  
  // console.log(projects)

  if (!user) return <Login onLogin={setUser} />;
  console.log(user);

    
  return(
      <div className="App">
      <Header user = {user} setUser = {setUser}/>

        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/explore" element={<ProjectCollection projects ={projects} />} /> 
          <Route path="/submit" element={<Submit />} />
          <Route path="/projects/:projectId" element={<ProjectPage />} />
        </Routes>

      </div>
  )
}


export default App;
