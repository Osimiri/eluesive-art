import React, { useState, useContext } from "react";
import { Button, Modal, Form } from "semantic-ui-react";
import { UserContext } from "./UserProvider";

function NewUpdateModal({project}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [notes, setNotes] = useState("");
  const [user, setUser] = useContext(UserContext);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log(project.id)
  const handleSubmit = () => {
    const newUpdate = {
      notes: notes,
      media_type: mediaType,
      image_url: imageUrl,
      title: title,
      likes: 0,
      project_id: project.id
    };
    console.log(newUpdate);
    
    fetch("/updates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUpdate),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);        
        handleClose();
      })
      .catch((err) => console.error(err));
  };

  return (
    <Modal
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      trigger={
        <Button
          style={{
            position: "fixed",
            top: "90px",
            right: "1450px",
            margin: "0",
          }}
        >
          Post Update
        </Button>
      }
    >
      <Modal.Header>Create a new update</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Title</label>
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Media Type</label>
            <input
              placeholder="Media Type"
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Image URL</label>
            <input
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Notes</label>
            <textarea
              placeholder="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          content="Create"
          labelPosition="right"
          icon="checkmark"
          onClick={handleSubmit}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default NewUpdateModal;
