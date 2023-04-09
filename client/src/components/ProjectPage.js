import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProjectUpdate from "./ProjectUpdate";

function ProjectPage() {
  const { id } = useParams(); // get id parameter from URL

  const [project, setProject] = useState(null);

  useEffect(() => {
    // fetch project details from backend API using id
    // setProject with fetched data
  }, [id]);

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
      {project.updates.map((update) => (
        <ProjectUpdate
          key={update.id}
          title={update.title}
          description={update.description}
          date={update.date}
        />
      ))}
    </div>
  );
}

export default ProjectPage;