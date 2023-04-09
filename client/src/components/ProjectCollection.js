
import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import ProjectCard from "./ProjectCard";
import {Card} from "semantic-ui-react";

// COLLECT ALL PROJECTS OR DOA  FETCH TO SPECIFY TO USER


function ProjectCollection({projects}){
  const projectCards = projects.map((project)=> {
      // console.log(project.creator)
      // console.log(project)

      return (
      <ProjectCard
        projectId = {project.id}
        title={project.title}
        users={project.users.map(user => user.user)}   
        // profileId = {users[0].id}     
        likes = {project.likes}
        image = {project.image_url}
        description = {project.description}
        creator = {project.creator}
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

// import React, { useEffect, useState } from "react";
// import { Link } from 'react-router-dom';
// import ProjectCard from "./ProjectCard";
// import { Card } from "semantic-ui-react";

// function ProjectCollection({ projects }) {
//   return (
//     <Card.Group itemsPerRow={4}>
//       {projects.map(project => (
//         <ProjectCard
//           key={project.id}
//           title={project.title}
//           likes={project.likes}
//           image={project.image_url}
//           description={project.description}
//           users={project.users.map(user => user.user)}
//         />
//       ))}
//     </Card.Group>
//   );
// }

// export default ProjectCollection;