import React from "react";
import {Image, Header, Container} from "semantic-ui-react";


function Sidebar({bio,username,profile_pic, full_name, user}) {
  
  // console.log(user)
  console.log(profile_pic)

  return (
    <div className="sidebar">
      <Image className = "uhhh" src= {profile_pic} size='big' circular alt="User Pic"/>
      {/* <Image src="https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Ffacebook%2F000%2F021%2F807%2Fig9OoyenpxqdCQyABmOQBZDI0duHk2QZZmWg2Hxd4ro.jpg" alt="User Avatar" size='big' circular alt="User Avatar"/> */}
      {/* <img src="https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Ffacebook%2F000%2F021%2F807%2Fig9OoyenpxqdCQyABmOQBZDI0duHk2QZZmWg2Hxd4ro.jpg" alt="User Avatar" /> */}

      {/* <input type= {username} placeholder="Hackerman" /> */}
      <Header as='h2' placeholder="Hackerman">{username}</Header>

      {/* Add the paragraph for the bio */}
      <Container>
        <Header as='h2'>Bio</Header>
        <p>{bio}</p>
      </Container>
      {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}
    </div>
  );
}

export default Sidebar;