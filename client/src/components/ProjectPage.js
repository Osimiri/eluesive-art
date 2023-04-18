import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UpdateCard from "./UpdateCard";
import NewUpdateModal from "./NewUpdateModal";

function ProjectPage() {
  const { projectId } = useParams(); // get id parameter from URL
  //   project_updates/1
  const [updates, setUpdates] = useState(null);
  const [project, setProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`/projects/${projectId}`)
      .then((res) => res.json())
      .then((data) => setProject(data));
  }, [projectId]);

  useEffect(() => {
    fetch(`/project_updates/${projectId}`)
      .then((res) => res.json())
      .then((data) => setUpdates(data));
  }, [projectId]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    
    <div>
      <div class="parent-div flex flex-row">
        <div class="project-details w-2/4 flex flex-col items-center justify-center">
          <h1 class= "text-5xl font-bold">{project.title}</h1>
          <p class="text-2xl">By: {project.creator}</p>
          <p class="text-2xl font-light">Description: {project.description}</p>
        </div>

        <div class="project-image w-2/4">
          <img
            class="max-h-full"
            src={project.image_url}
            alt={project.title}
          />
        </div>
      </div>

      <h2>Updates:</h2>
      {updates &&
        updates.map((update) => (
          <UpdateCard
            key={update.id}
            likes={update.likes}
            date={update.created_at}
            image={update.image_url}
            update={update}
            notes={update.notes}
            title={update.title}
          />
        ))}
        <NewUpdateModal
        project ={project}
          open={showModal}
          setOpen={setShowModal}
        />
    </div>
  );
}

export default ProjectPage;
