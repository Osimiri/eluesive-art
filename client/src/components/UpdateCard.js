import React, { useState, useContext } from "react";
import CommentsModal from "./CommentsModal";
import { Card, Image, Button, Icon, Modal } from "semantic-ui-react";
import { UserContext } from "./UserProvider";

function UpdateCard({
  title,
  update,
  likes,
  date,
  image,
  notes,
  project,
  handleUpdateDeleted,
}) {
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [user, setUser] = useContext(UserContext);
  const [showImageModal, setShowImageModal] = useState(false);

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
        console.log("its deleted LOL");
        handleUpdateDeleted(update.id);
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
        <div onClick={() => setShowImageModal(true)}>
          <Image
            className="card-image cursor-pointer"
            src={image}
            alt={title}
          />
        </div>
        <Card.Header>{update.title}</Card.Header>
        <Card.Meta className="font-bold">{formattedDate}</Card.Meta>

        <div>
          <p onClick={handleImageClick} className="underline cursor-pointer">
            {" "}
            Show More
          </p>
          <Card.Description>
            {showNotes && (
              <p>
                {isOwner && (
                  <div className="flex">
                    <i
                      class="trash alternate icon underline"
                      name="delete"
                      size="large"
                      onClick={handleDelete}
                      style={{ cursor: "pointer" }}
                    />
                    <p> Delete Update </p>
                  </div>
                )}
                {notes}
              </p>
            )}
          </Card.Description>
        </div>
        <Button onClick={handleCommentsClick}>Comments</Button>
      </Card.Content>
      <CommentsModal
        open={showCommentsModal}
        onClose={() => setShowCommentsModal(false)}
        comments={update.comments}
        update={update}
      />

      {showImageModal && (
        <Modal
          open={showImageModal}
          onClose={() => setShowImageModal(false)}
          className="image-modal"
        >
          <Modal.Content image class="block width-full m-auto ">
            <Image className= "width-full m-auto"src={image} alt={title} />
          </Modal.Content>
          </Modal>
      )}

    </Card>
  );
}

export default UpdateCard;
