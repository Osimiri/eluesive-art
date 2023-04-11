import React, { useState } from "react";
import CommentsModal from "./CommentsModal";
import { Card, Image, Button } from "semantic-ui-react";

function UpdateCard({ title, update, likes, date, image, notes }) {
  const [showCommentsModal, setShowCommentsModal] = useState(false);

  const handleCommentsClick = () => {
    setShowCommentsModal(true);
  };
  return (
    <Card>
      <Card.Content>
        <Image
          className="card-image"
          src={image}
          alt={title}
        />
        <Card.Header>{update.title}</Card.Header>
        <Card.Description>{update.content}</Card.Description>
        <Button onClick={handleCommentsClick}>Comments</Button>
      </Card.Content>
      <CommentsModal
        open={showCommentsModal}
        onClose={() => setShowCommentsModal(false)}
        comments={update.comments}
        update = {update}
      />
    </Card>
  );
}

export default UpdateCard;
