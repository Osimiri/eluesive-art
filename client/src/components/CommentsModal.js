import React, { useState, useEffect } from "react";
import { Modal, Comment, Button } from "semantic-ui-react";

function CommentsModal({ open, onClose, update }) {
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`/update_comments/${update.id}`);
      const data = await response.json();
      setComments(data.comments);
    };
    fetchComments();
  }, [update.id]);

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
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>Close</Button>
      </Modal.Actions>
    </Modal>
  );
}

export default CommentsModal;