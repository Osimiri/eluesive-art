import React from "react";

function UserDetails(props) {
  const { fullName, bio, profilePic } = props;

  return (
    <div className="user-details">
      <img src={profilePic} alt="Profile" />
      <h2>{fullName}</h2>
      <p>{bio}</p>
    </div>
  );
}

export default UserDetails;