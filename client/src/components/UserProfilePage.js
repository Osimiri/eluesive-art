import React, { useState, useEffect, useContext } from "react";
import SideBar from "./SideBar";
import ProjectCard from "./ProjectCard";
import NewProjectModal from "./NewProjectModal";
import { UserContext } from "./UserProvider";
import { Button, Modal, Form } from "semantic-ui-react";

function UserProfilePage(props) {
  const [user, setUser] = useContext(UserContext);
  const [projects, setProjects] = useState([]);
  const [profile, setProfile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const bio = user.biography;
  const full_name = user.full_name;
  const profile_pic = user.image_url;
  const username = user.username;

  useEffect(() => {
    fetch(`/users/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setProjects(data.projects.map((projects) => projects.project));
      });
  }, [user.id]);

  return (
    <div className="user-profile-page">
      {user && (
        <>
          {projects.length > 0 && (
            <ProjectCard
              projectId={projects.id}
              title={projects.title}
              users={projects.users.map((user) => user.user)}
              likes={projects.likes}
              image={projects.image_url}
              description={projects.description}
              creator={projects.creator}
            />
          )}

          <SideBar
            user={user}
            bio={bio}
            username={username}
            profile_pic={profile_pic}
            full_name={full_name}
          />
          
          <NewProjectModal open={showModal} setOpen={setShowModal} />
        </>
      )}
    </div>
  );
}

export default UserProfilePage;