import React, { useState, useContext } from "react";
import CommentsModal from "./CommentsModal";
import { Card, Image, Button, Icon } from "semantic-ui-react";
import { UserContext } from "./UserProvider";

function UpdateCard({ title, update, likes, date, image, notes, project }) {
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [user, setUser] = useContext(UserContext);

  const handleCommentsClick = () => {
    setShowCommentsModal(true);
  };

  const handleImageClick = () => {
    setShowNotes(!showNotes);
  };

  const formattedDate = new Date(date).toLocaleString();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/updates`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        // Update the state to remove the deleted update
        // For example, we could pass down a function to the component that removes the update from the parent component's state
      } else {
        throw new Error("Failed to delete update");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isOwner = user && user.id === project.user_id;

  return (
    <Card>
      <Card.Content>
        <div onClick={handleImageClick}>
          <Image className="card-image" src={image} alt={title} />
        </div>
        <Card.Header>{update.title}</Card.Header>
        <Card.Meta class="font-bold">{formattedDate}</Card.Meta>
        <Card.Description>
          {showNotes && (
            <p>
              {isOwner && (
                <Icon
                  name="delete"
                  size="large"
                  color="red"
                  onClick={handleDelete}
                  style={{ cursor: "pointer" }}
                />
              )}
              {notes}
            </p>
          )}
        </Card.Description>
        <Button onClick={handleCommentsClick}>Comments</Button>
      </Card.Content>
      <CommentsModal
        open={showCommentsModal}
        onClose={() => setShowCommentsModal(false)}
        comments={update.comments}
        update={update}
      />
    </Card>
  );
}

export default UpdateCard;
