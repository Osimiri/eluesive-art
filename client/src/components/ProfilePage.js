import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import { useParams } from "react-router-dom";
import OtherProjectCard from "./OtherProjectCard";
import Masonry from 'react-masonry-css';


function ProfilePage() {
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

  console.log(userId);

  useEffect(() => {
    fetch(`/projects_user/${user.id}`)
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, [user]);

  return (

    <div className="bg-[#f5f1ed] h-full w-screen">
      <div className="user-profile-page bg-[#f5f1ed] h-screen w-screen">
        {user && (
          <>
            <Masonry
          breakpointCols={{default: 2, 768: 1}}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
          >
            {projects.map((project) => (
              <OtherProjectCard
                key={project.id}
                projectId={project.id}
                title={project.title}
                likes={project.likes}
                image={project.image_url}
                description={project.description}
                creator={project.creator}
              />
            ))}
          </Masonry>
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
    </div>
  );
}

export default ProfilePage;
