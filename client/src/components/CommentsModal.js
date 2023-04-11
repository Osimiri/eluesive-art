import React, { useState, useEffect, useContext } from "react";
import { Modal, Comment, Button, Form } from "semantic-ui-react";
import { UserContext } from "./UserProvider";

function CommentsModal({ open, onClose, update }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`/update_comments/${update.id}`);
      const data = await response.json();
      setComments(data.comments);
    };
    fetchComments();
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

  const handleEdit = (commentId) => {
    // to do tommorrow
  };

  

  const handleAddComment = async (event) => {
    event.preventDefault();
    const form = event.target;
    console.log(form)
    const formData = new FormData(form);
    const commentContent = formData.get("comment");
    const newComment = {
      // id: comments.length + 1,
      user_id: user.id,
      update_id: update.id,
      // username: user.user,
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
      console.log(comments)

      setComments([...comments, data]);
      setNewComment("");
    } catch (error) {
      console.error(error);
    }
    form.reset();
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
                  <Comment.Text>{comment.content}</Comment.Text>
                  {user && user.id === comment.user_id && (
                    <Comment.Actions>
                      <Comment.Action onClick={() => handleEdit(comment.id)}>
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
            <p>loading...</p>
          )}
        </Comment.Group>
        <Form onSubmit={handleAddComment}>
          <Form.Group>
            <Form.Input name="comment" placeholder="Leave a comment" />
            <Form.Button type="submit" content="Add Comment" />
          </Form.Group>
        </Form>
        {/* {user && (
          <div>
            <input
              type="text"
              placeholder="Leave a comment"
              value={newComment}
              onChange={(event) => setNewComment(event.target.value)}
            />
            <Button onClick={handleAddComment}>Add Comment</Button>
          </div>
        )} */}
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>Close</Button>
      </Modal.Actions>
    </Modal>
  );
}

export default CommentsModal;
