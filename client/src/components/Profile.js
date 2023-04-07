import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

function UserProfilePage(props) {
  const [userData, setUserData] = useState(null);


//   fetch to id?                               
  useEffect(() => {
    // Fetch user data from server or database using props.match.params.userId or props.match.params.username
    // Set the fetched data to the userData state using setUserData
  }, [props.match.params.userId, props.match.params.username]);

  return (
    <div className="user-profile-page">
      {userData && (
        <>
          <Sidebar userData={userData} />
          {/* Render other components specific to the user */}
        </>
      )}
    </div>
  );
}

export default UserProfilePage;