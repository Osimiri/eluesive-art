import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import { useParams } from "react-router-dom";
import ProjectCard from "./ProjectCard";

function UserProfilePage() {
  const [user, setUser] = useState([]);
  const [projects, setProjects] = useState([]);
  const { userId } = useParams(); // get id parameter from URL

  const bio = user.biography;
  const full_name = user.full_name;
  const profile_pic = user.image_url;
  const username = user.username;

  useEffect(() => {
    fetch(`/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [userId]);

  console.log(user)

  useEffect(() => {
    fetch(`/projects_user/${user.id}`)
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, [user]);

  return (
    <div className="user-profile-page">
      {user && (
        <>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              projectId={project.id}
              title={project.title}
              likes={project.likes}
              image={project.image_url}
              description={project.description}
              creator={project.creator}
            />
          ))}

          <SideBar
            user={user}
            bio={bio}
            username={username}
            profile_pic={profile_pic}
            full_name={full_name}
          />
        </>
      )}
    </div>
  );
}

export default UserProfilePage;
