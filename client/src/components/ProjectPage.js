import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UpdateCard from "./UpdateCard";

function ProjectPage() {
  const { projectId } = useParams(); // get id parameter from URL
  //   project_updates/1
  const [updates, setUpdates] = useState(null);
  const [project, setProject] = useState(null);

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
      <h1>{project.title}</h1>
      <p>Creator: {project.creator}</p>
      <img src={project.image_url} alt={project.title} />
      <p>Description: {project.description}</p>

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
    </div>
  );
}

export default ProjectPage;
