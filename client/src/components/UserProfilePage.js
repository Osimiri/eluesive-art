import React, { useState, useEffect, useContext } from "react";
import SideBar from "./SideBar";
import ProjectCard from "./ProjectCard";
import NewProjectModal from "./NewProjectModal";
import { UserContext } from "./UserProvider";

function UserProfilePage({ refreshExplore }) {
  const [user, setUser] = useContext(UserContext);
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const bio = user.biography;
  const full_name = user.full_name;
  const profile_pic = user.image_url;
  const username = user.username;

  useEffect(() => {
    fetch(`/projects_user/${user.id}`)
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  // Function so page rerenders on post
  function refreshProject(){
    fetch(`/projects_user/${user.id}`)
      .then((res) => res.json())
      .then((data) => setProjects(data));
}
  return (
    <div className="user-profile-page">
      {user && (
        <>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              projectId={project.id}
              project={project}
              title={project.title}
              likes={project.likes}
              image={project.image_url}
              description={project.description}
              creator={project.creator}
              setProjects ={setProjects}
              projects = {projects}
              refreshExplore={refreshExplore}
              refreshProject = {refreshProject}
            />
          ))}

          <SideBar
            user={user}
            bio={bio}
            username={username}
            profile_pic={profile_pic}
            full_name={full_name}
          />

          <NewProjectModal
            open={showModal}
            setOpen={setShowModal}
            refreshExplore={refreshExplore}
            refreshProject = {refreshProject}
            setProjects = {setProjects}
          />
        </>
      )}
    </div>
  );
}

export default UserProfilePage;
