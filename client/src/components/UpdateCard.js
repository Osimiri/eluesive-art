import React, { useState } from "react";
import { Card, Image, Button, Header, Icon, Label } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

function UpdateCard({
  title,
  update,
  likes,
  date,
  image,
  notes
  
}) {
  const [showFront, setShowFront] = useState(true);

  const toggleCard = () => {
    setShowFront(!showFront);
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
                {<p>Notes: {notes}</p>}
                <Card.Content extra>
    
                </Card.Content>
              </Card.Description>
            </Card.Content>
            <Button.Group attached="bottom" size="medium">
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
                attached="right"
                color="brown"
                //   onClick= {handleDelete}
              >
                Delete
              </Button>
            </Button.Group>
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
            <Button.Group attached="bottom" size="medium">
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
                attached="right"
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

export default UpdateCard;
