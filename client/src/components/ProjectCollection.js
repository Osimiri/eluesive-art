
import React from "react";
// import {Link} from 'react-router-dom';
import ProjectCard from "./ProjectCard";
import {Card} from "semantic-ui-react";

// COLLECT ALL PROJECTS OR DOA  FETCH TO SPECIFY TO USER


function ProjectCollection({projects, refreshExplore}){
  const projectCards = projects.map((project)=> {
      // console.log(project.creator)
      console.log(project)

      return (
      <ProjectCard
        projectId = {project.id}
        title={project.title}
        likes = {project.likes}
        image = {project.image_url}
        description = {project.description}
        creator = {project.creator}
        refreshExplore = {refreshExplore}
        project = {project}
      />
    );
  });

  
  return (
    <Card.Group itemsPerRow={4}>
      {projectCards}
    </Card.Group>
  )



}

export default ProjectCollection;