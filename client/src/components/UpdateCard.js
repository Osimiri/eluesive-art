import React, { useState, useContext } from "react";
import CommentsModal from "./CommentsModal";
import { Card, Image, Button, Icon } from "semantic-ui-react";
import { UserContext } from "./UserProvider";

function UpdateCard({ title, update, likes, date, image, notes, project,handleUpdateDeleted }) {
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
      const response = await fetch(`/updates/${update.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log('its deleted LOL')
        handleUpdateDeleted(update.id)
        
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
        <Card.Meta className="font-bold">{formattedDate}</Card.Meta>
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
