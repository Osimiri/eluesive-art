import React, { useState, useContext } from "react";
import { Card, Image, Button, Icon, Label } from "semantic-ui-react";
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
  refreshExplore

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
        refreshExplore()
        refreshProject()
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
      style={{ height: "750px", padding: "15px" }}
      centered
      raised
      className="card-container"
    >
      {showFront ? (
        <>
          <div className="BookFlic">
            <Image
              className="card-image"
              src={image}
              alt={title}
              onClick={toggleCard}
            />
          </div>
          <Card.Content style={{ height: "100px", width: "auto" }}>
            <Card.Header>{title}</Card.Header>
            <Card.Meta>
              <span className="date">Price: Priceless</span>
            </Card.Meta>
            <Card.Description>
              {<p>Description: {description}</p>}
              <p>Creator: {creator}</p>
              {/* <p>Collaborators: {users[0].username}</p> */}
              <Card.Content extra>
                <NavLink to={`/projects/${projectId}`}>View Project</NavLink>
                {/* ^^^^^^^^^CHANGE THIS SO IT RENDERS TO A UNIQUE PROJECT PAGE ^^^^^^^^  */}
              </Card.Content>
            </Card.Description>
          </Card.Content>
          {user && user.id === project.user_id && (
            // <Button.Group attached="bottom" size="medium">
              <Button className="button" color="brown" onClick={() => handleDelete()}>
                Delete
              </Button>
            // </Button.Group>
          )}
        </>
      ) : (
        <>
          <Image
            className="author-card-image"
            onClick={toggleCard}
            src={image}
          />
          <Card.Content style={{ height: "100px" }}>
            <Card.Header>{title}</Card.Header>
            <Card.Description></Card.Description>
          </Card.Content>
        </>
      )}
    </Card>
  );
}

export default ProjectCard;
