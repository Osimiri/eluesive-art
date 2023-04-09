import React, {useState} from "react";
import { Card, Image, Button, Header, Icon, Label } from "semantic-ui-react";
import { NavLink } from 'react-router-dom';


function ProjectCard({ title, users, description, image, likes, creator, profileId, projectId }) {
  
  const [showFront, setShowFront] = useState(true);

  const toggleCard = () => {
    setShowFront(!showFront);
  };

  const userID = users[0].id
    console.log(userID) 
  
  
    return (
      
  <Card style={{height: "750px", padding: "15px"}} centered raised className="card-container" >
    {showFront ? (
      <>
        <div className = "BookFlic">
          <Image className="card-image" src={image} alt={title} onClick={toggleCard} />
        </div>
        <Card.Content style={{height: "100px", width: 'auto'}}>
          <Card.Header >{title}</Card.Header>
          <Card.Meta>
            <span className="date">Price: Priceless</span>
          </Card.Meta>
          <Card.Description >
            {<p>Description: {description}</p>}
            <p>Creator: {creator}</p>
            {/* <p>Collaborators: {users[0].username}</p> */}
        <Card.Content extra>
            <NavLink exact to="/project-details">View Project</NavLink>              
            {/* ^^^^^^^^^CHANGE THIS SO IT RENDERS TO A UNIQUE PROJECT PAGE ^^^^^^^^  */}
</Card.Content>
          </Card.Description>
        </Card.Content>
          <Button.Group attached= 'bottom' size = "medium">
            <Button as="div" labelPosition="right">
              <Button color="brown">
                <Icon name="heart" />
              </Button>
              <Label as="a" basic pointing="left">
                {likes} Likes!
              </Label>
            </Button>

            <Button 
              className="button" 
              attached = 'right'
              color="brown" 
            //   onClick= {handleDelete}
              >
              Delete
            </Button>
          </Button.Group>
      </>
    ) : (
      <>
        <Image className="author-card-image" onClick={toggleCard} src = {image} />
        <Card.Content style={{height: "100px"}}>
          <Card.Header>{title}</Card.Header>
          <Card.Description ></Card.Description>
        </Card.Content>
          <Button.Group attached= 'bottom' size = "medium" >
            <Button as="div" labelPosition="right">
              <Button color="brown" >
                <Icon name="heart" />
              </Button>
              <Label as="a" basic pointing="left">
                {likes} Likes!
              </Label>
            </Button>
            
            <Button 
              className="button" 
              attached = 'right'
              color="brown" 
            //   onClick= {handleDelete}
              >
              Delete
            </Button>
          </Button.Group>
      </>
  )}
</Card>
);
} 

// function ProjectCard({ title, likes, image, description, users }) {
//     return (
//       <Card>
//         <Card.Content>
//           <Card.Header>{title}</Card.Header>
//           <Card.Description>{description}</Card.Description>
//           <Card.Meta>
//             Creator: {users[0].username}
//           </Card.Meta>
//           <Card.Meta>
//             Likes: {likes}
//           </Card.Meta>
//         </Card.Content>
//         <Card.Content extra>
//           {/* <Link to="/project-details">View Project</Link> */}
//         </Card.Content>
//       </Card>
//     );
//   }

export default ProjectCard;

