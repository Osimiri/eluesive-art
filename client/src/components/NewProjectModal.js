import React, { useState, useContext } from "react";
import { Button, Modal, Form } from "semantic-ui-react";
import { UserContext } from "./UserProvider";

function NewProjectModal({ refreshExplore, setProjects, refreshProject }) {
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

  const handleSubmit = () => {
    if (!title || !imageUrl || !description) {
      alert("Please fill out all required fields.");
      return;
    }

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
        // setProjects((projects) => [projects,...data])
        refreshExplore();
        refreshProject();
        handleClose();
      })
      .catch((err) => console.error(err));
  };

  return (
    <Modal
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      // trigger={<Button style={{ display: "inline-block", margin: "0 10px", float: "right" }}>Create Project</Button>}
      trigger={
        <Button
          style={{
            position: "fixed",
            top: "90px",
            right: "30px",
            margin: "0",
          }}
        >
          Create Project
        </Button>
      }
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
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Image URL</label>
            <input
              placeholder="Image URL must end with .png or .jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <textarea
              placeholder="Description must be less tha 300 characters long"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={300}
              required
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
