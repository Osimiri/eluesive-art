import React from "react";
import ProjectCard from "./ProjectCard";
import Masonry, { default as MasonryItem } from 'react-masonry-css';

function ProjectCollection({ projects, refreshExplore }) {
  const projectCards = projects.map((project) => (
    <MasonryItem key={project.id}>
      <ProjectCard
        projectId={project.id}
        title={project.title}
        likes={project.likes}
        image={project.image_url}
        description={project.description}
        creator={project.creator}
        refreshExplore={refreshExplore}
        project={project}
      />
    </MasonryItem>
  ));

  const breakpointColumnsObj = {
    default: 4, 
    1100: 3,
    700: 2,
    500: 1,
  };

  return (

    <div className="bg-[#f5f1ed]">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid bg-[#f5f1ed]"
        columnClassName="my-masonry-grid_column"
      >
        {projectCards}
      </Masonry>
    </div>
  );
}

export default ProjectCollection;