import React, { useState, useContext } from "react";
import { Button, Modal, Form } from "semantic-ui-react";
import { UserContext } from "./UserProvider";

function NewProjectModal(props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useContext(UserContext);

  // console.log(user.username)
  // console.log(user)
  // console.log(title)

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

//   TRY TO POST TO THE USERPROJECTS INSTEAD. POST WORKS BUT DOESNT CONNECT USER
const handleSubmit = () => {
    const newProject = {
      title: title,
      image_url: imageUrl,
      description: description,
      creator: user.username,
      user_id: user.id
    };
    console.log(newProject);
    fetch("/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
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
      trigger={<Button style={{ display: "inline-block", margin: "0 10px", float: "right" }}>Create Project</Button>}
    >
      <Modal.Header>Create a new project</Modal.Header>
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
            <label>Image URL</label>
            <input
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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

export default NewProjectModal;