import React, { useState, useContext } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { UserContext } from "./UserProvider";

function ProjectCard({
  title,
  description,
  image,
  project,
  creator,
  projectId,
  refreshProject,
  refreshExplore,
}) {
  const [showFront, setShowFront] = useState(true);
  const [user, setUser] = useContext(UserContext);

  const toggleCard = () => {
    setShowFront(!showFront);
  };

  // console.log(projectId);

  const handleDelete = async (event) => {
    console.log(projectId);
    try {
      const response = await fetch(`/projects/${projectId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        refreshExplore();
        refreshProject();
        // loop over projects and filter for ones that dont have the id of selected one then use setPrtojects again
        console.log("Project Sucesfully Deleted");
      } else {
        throw new Error("Failed to delete project");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card
      style={{ height: "auto", padding: "10px", width: "500px" }}
      centered
      raised
      className="card-container"
    >
      <>
        <div className="ProjectFlic">
          <Image
            className="card-image"
            src={image}
            alt={title}
            onClick={toggleCard}
          />
        </div>
        <div className="card-info">
          <Card.Content style={{ height: "auto", width: "auto" }}>
            <Card.Header class="text-2xl font-medium ">
              Title: {title}
            </Card.Header>
            <Card.Meta>
              <span className="date">Price: Priceless</span>
            </Card.Meta>
            <NavLink to={`/projects/${projectId}`}>View Project</NavLink>
            {/* <Button
              className="button"
              color="brown"
              as={NavLink}
              to={`/projects/${projectId}`}
            >
              View Project
            </Button> */}
            <div className="card-description-hover">
              <Card.Description>
                <p class="text-2xl font-extrabold">Creator: {creator}</p>
                {<p class="text-lg font-light">Description: {description}</p>}
                <Card.Content extra></Card.Content>
              </Card.Description>
            </div>
          </Card.Content>
        </div>
        {user && user.id === project.user_id && (
          <Button
            className="button"
            color="brown"
            onClick={() => handleDelete()}
          >
            Delete
          </Button>
        )}
      </>
    </Card>
  );
}

export default ProjectCard;
