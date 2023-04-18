import React, { useState, useEffect, useContext } from "react";
import SideBar from "./SideBar";
import { useParams } from "react-router-dom";
import UpdateCard from "./UpdateCard";
import NewUpdateModal from "./NewUpdateModal";
import { UserContext } from "./UserProvider";
import Masonry from "react-masonry-css";

function ProjectPage() {
  const { projectId } = useParams(); // get id parameter from URL
  //   project_updates/1
  const [poster, setPoster] = useState(null);
  const [updates, setUpdates] = useState(null);
  const [project, setProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    fetch(`/projects/${projectId}`)
      .then((res) => res.json())
      .then((data) => setProject(data))
      .catch((error) => console.log(error));
  }, [projectId]);

  useEffect(() => {
    if (project) {
      fetch(`/project_updates/${project.id}`)
        .then((res) => res.json())
        .then((data) => setUpdates(data))
        .catch((error) => console.log(error));
    }
  }, [project]);

  useEffect(() => {
    if (project) {
      fetch(`/users/${project.user_id}`)
        .then((res) => res.json())
        .then((data) => setPoster(data))
        .catch((error) => console.log(error));
    }
  }, [project]);

  if (!project) {
    return <div>Loading...</div>;
  }

  const posterId = project.user_id;

  if (!poster) {
    return <div>Loading poster...</div>;
  }

  // console.log(project);
  const bio = poster.biography;
  const full_name = poster.full_name;
  const profile_pic = poster.image_url;
  const username = poster.username;

  const handleUpdateDeleted = (id) => {
    const updatedUpdates = updates.filter((update) => update.id !== id);
    setUpdates(updatedUpdates);
  };

  return (
    <div>
      <div className="parent-div flex flex-row">
        <div className="project-details w-2/4 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold">{project.title}</h1>
          <p className="text-2xl">By: {project.creator}</p>
          <p className="text-2xl font-light">Description: {project.description}</p>
        </div>

        <div className="project-image w-2/4">
          <img className="max-h-full" src={project.image_url} alt={project.title} />
        </div>
      </div>
      {user.id === project.user_id && (
        <NewUpdateModal
          project={project}
          open={showModal}
          setOpen={setShowModal}
          setUpdates={setUpdates}
          updates={updates}
        />
      )}
      <h2 className=" pt-15 text-2xl font-light underline underline-offset-8 font-black ">Updates:</h2>
      
      <Masonry
        breakpointCols={3}
        className="updates-grid"
        columnClassName="updates-masonry-grid_column"
      >
        {updates &&
          updates.map((update) => (
            <div key={update.id} className="my-masonry-grid_column">
              <UpdateCard
                likes={update.likes}
                date={update.created_at}
                image={update.image_url}
                update={update}
                notes={update.notes}
                title={update.title}
                project={project}
                handleUpdateDeleted={handleUpdateDeleted}
              />
            </div>
          ))}
      </Masonry>

      <SideBar
        user={user}
        bio={bio}
        username={username}
        profile_pic={profile_pic}
        full_name={full_name}
      />
    </div>
  );
}

export default ProjectPage;
