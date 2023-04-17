import React from "react";
// import {Link} from 'react-router-dom';
import ProjectCard from "./ProjectCard";
import { Card } from "semantic-ui-react";


function ProjectCollection({ projects, refreshExplore }) {
  const projectCards = projects.map((project) => {
    console.log(project.creator);
    // console.log(project)

    return (
      <ProjectCard
        key={project.id}
        projectId={project.id}
        title={project.title}
        likes={project.likes}
        image={project.image_url}
        description={project.description}
        creator={project.creator}
        refreshExplore={refreshExplore}
        project={project}
      />
    );
  });

  return (
    <div className="card-group">
      <Card.Group itemsPerRow={4}>{projectCards}</Card.Group>
    </div>
  );
}

export default ProjectCollection;
