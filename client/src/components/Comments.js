import { useState } from "react";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import "../styles";

function Comments({ onLogin }) {
    
    const [comments, setComments] = useState([]);



    useEffect(() => {
        fetch("/comments")       // link for the authors DB
          .then((res) => res.json())
          .then((data) => setComments(data));
      }, []);

      console.log(comments)

  return (
     <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input type="text" placeholder="write a comment" />
        <button>Send</button>
      </div>
      {comments.map((comment) => (
        <div className="comment">
          <img src={comment.profilePicture} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">1 hour ago</span>
        </div>
      ))}
    </div>
  );
};

export default Comments