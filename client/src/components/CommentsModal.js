import React, { useState, useEffect, useContext } from "react";
import { Modal, Comment, Button, Form } from "semantic-ui-react";
import { UserContext } from "./UserProvider";


function CommentsModal({ open, onClose, update }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [user, setUser] = useContext(UserContext);
  const [editComment, setEditComment] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`/update_comments/${update.id}`);
      const data = await response.json();
      setComments(data.comments);
    };
    fetchComments();
    // set interval to fetch comments every 9 seconds
    // const intervalId = setInterval(fetchComments, 9000);
    // clear interval on component
    // return () => clearInterval(intervalId);
  }, [update.id]);

  const handleDelete = async (commentId) => {
    try {
      const response = await fetch(`/comments/${commentId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setComments(comments.filter((comment) => comment.id !== commentId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (comment) => {
    setEditComment(comment);
  };

  const handleAddComment = async (event) => {
    event.preventDefault();
    const form = event.target;
    console.log(form);
    const formData = new FormData(form);
    const commentContent = formData.get("comment");
    const newComment = {
      user_id: user.id,
      update_id: update.id,
      avatar: user.image_url,
      timestamp: new Date().toString(),
      content: commentContent,
    };

    try {
      const response = await fetch(`/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newComment.content,
          user_id: newComment.user_id,
          update_id: newComment.update_id,
        }),
      });
      const data = await response.json();
      console.log(data);
      console.log(comments);

      setComments([...comments, data]);
      setNewComment("");
    } catch (error) {
      console.error(error);
    }
    form.reset();
  };

  const handleUpdateComment = async (event, comment) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const updatedComment = formData.get("comment");

    try {
      const response = await fetch(`/comments/${comment.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: updatedComment,
        }),
      });

      const data = await response.json();
      const updatedComments = comments.map((c) =>
        c.id === comment.id ? data : c
      );
      setComments(updatedComments);
      setEditComment(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>Comments</Modal.Header>
      <Modal.Content>
        <Comment.Group>
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              // console.log(comment)
              <Comment key={comment.id}>
                <Comment.Avatar src={comment.avatar} />
                <Comment.Content>
                  <Comment.Author as="a">{comment.username}</Comment.Author>
                  <Comment.Metadata>
                    <div>{comment.timestamp}</div>
                  </Comment.Metadata>
                  {editComment === comment ? (
                    <Form onSubmit={(e) => handleUpdateComment(e, comment)}>
                      <Form.TextArea
                        name="comment"
                        defaultValue={comment.content}
                      />
                      <Form.Button type="submit" content="Update Comment" />
                    </Form>
                  ) : (
                    <Comment.Text>{comment.content}</Comment.Text>
                  )}
                  {user && user.id === comment.user_id && (
                    <Comment.Actions>
                      <Comment.Action onClick={() => handleEdit(comment)}>
                        Edit
                      </Comment.Action>
                      <Comment.Action onClick={() => handleDelete(comment.id)}>
                        Delete
                      </Comment.Action>
                    </Comment.Actions>
                  )}
                </Comment.Content>
              </Comment>
            ))
          ) : (
            <p>Be the first to comment.</p>
          )}
        </Comment.Group>
        <Form onSubmit={handleAddComment}>
          <Form.Group>
            <Form.Input name="comment" placeholder="Leave a comment" />
            <Form.Button type="submit" content="Add Comment" />
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>Close</Button>
      </Modal.Actions>
    </Modal>
  );
}

export default CommentsModal;