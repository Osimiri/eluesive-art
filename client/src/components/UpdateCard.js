import React, { useState } from "react";
import {
  Card,
  Image,
  Button,
  Header,
  Icon,
  Label,
  Modal,
} from "semantic-ui-react";
import { NavLink } from "react-router-dom";

function UpdateCard({ title, update, likes, date, image, notes }) {
  const [showFront, setShowFront] = useState(true);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [selectedUpdateComments, setSelectedUpdateComments] = useState([]);

  const toggleCard = () => {
    setShowFront(!showFront);
  };

  const handleCommentsModalOpen = async (updateId) => {
    try {
      const res = await fetch(`/update_comments/${updateId}`);
      const data = await res.json();
      setSelectedUpdateComments(data);
      setShowCommentsModal(true);
    } catch (error) {
      console.error("Error fetching comments:", error);
      // update state to show error message
      setSelectedUpdateComments([]);
      setShowCommentsModal(false);
      // you could also show a toast or modal with the error message
    }
  };

  console.log(selectedUpdateComments);

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
              <p>Notes: {notes}</p>
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
              onClick={() => handleCommentsModalOpen(update.id)}
            >
              View comments
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
            <Card.Description>
              <p> When Did this Drop? {date}</p>
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
              onClick={() => setShowCommentsModal(true)}
            >
              View comments
            </Button>
          </Button.Group>
        </>
      )}

      <Modal
        open={showCommentsModal}
        onClose={() => setShowCommentsModal(false)}
      >
        <Modal.Header>Comments</Modal.Header>
        <Modal.Content>
          {selectedUpdateComments &&
            selectedUpdateComments.comments &&
            selectedUpdateComments.comments.map((comment) => (
              <div key={comment.id}>
                <p>{comment.content}</p>
                <p>{comment.timestamp}</p>
                {/* <p>{comment.get_username()}</p> */}
              </div>
            ))}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setShowCommentsModal(false)}>Close</Button>
        </Modal.Actions>
      </Modal>
    </Card>
  );
}

export default UpdateCard;
