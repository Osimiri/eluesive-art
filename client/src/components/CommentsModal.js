import React, { useState, useEffect, useContext } from "react";
import { Modal, Comment, Button, Form } from "semantic-ui-react";
import { UserContext } from "./UserProvider";

function CommentsModal({ open, onClose, update }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { user } = useContext(UserContext); // access user context value

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`/update_comments/${update.id}`);
      const data = await response.json();
      setComments(data.comments);
    };
    fetchComments();
  }, [update.id]);

  const handleDelete = (commentId) => {
    // handle delete logic
  };

  const handleEdit = (commentId) => {
    // handle edit logic
  };

  const handleAddComment = async () => {
    try {
      const response = await fetch(`/update_comments/${update.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newComment }),
      });
      const data = await response.json();
      setComments([...comments, data.comment]);
      setNewComment("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewComment = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const commentContent = formData.get("comment");
    const newComment = {
      id: comments.length + 1,
      username: "User",
      avatar: "https://react.semantic-ui.com/images/avatar/small/matt.jpg",
      timestamp: new Date().toString(),
      content: commentContent,
    };
    setComments([...comments, newComment]);
    form.reset();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>Comments</Modal.Header>
      <Modal.Content>
        <Comment.Group>
          {comments.map((comment) => (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.avatar} />
              <Comment.Content>
                <Comment.Author as="a">{comment.username}</Comment.Author>
                <Comment.Metadata>
                  <div>{comment.timestamp}</div>
                </Comment.Metadata>
                <Comment.Text>{comment.content}</Comment.Text>
                {user && user.id === comment.userId && (
                  <Comment.Actions>
                    <Comment.Action onClick={() => handleEdit(comment.id)}>Edit</Comment.Action>
                    <Comment.Action onClick={() => handleDelete(comment.id)}>Delete</Comment.Action>
                  </Comment.Actions>
                )}
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
        <Form onSubmit={handleNewComment}>
          <Form.Group>
            <Form.Input name="comment" placeholder="Add a comment" />
            <Form.Button content="Add" />
          </Form.Group>
        </Form>
        {user && (
          <div>
            <input
              type="text"
              placeholder="Leave a comment"
              value={newComment}
              onChange={(event) => setNewComment(event.target.value)}
            />
            <Button onClick={handleAddComment}>Add Comment</Button>
          </div>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>Close</Button>
      </Modal.Actions>
    </Modal>
  );
}

export default CommentsModal;