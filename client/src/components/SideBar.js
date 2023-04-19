import React from "react";
import {Image, Header, Container} from "semantic-ui-react";


function Sidebar({bio,username,profile_pic, full_name, user, userId}) {
  
  console.log(userId)
  const profileRoute = `/profile/${userId}`

  return (
    
    <div className="sidebar bg-[#A1A485]">

      <a href= {profileRoute}>
        <Image className = "uhhh" src= {profile_pic} size='big' circular alt="User Pic"/>
      </a>
      {/* <Image src="https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Ffacebook%2F000%2F021%2F807%2Fig9OoyenpxqdCQyABmOQBZDI0duHk2QZZmWg2Hxd4ro.jpg" alt="User Avatar" size='big' circular alt="User Avatar"/> */}
      
      <div className="flex flex-col place-items-center mt-6">
        <Header as='h2' placeholder="Hackerman" className='mx auto '>{username}</Header>
        <Container>
          <Header as='h2'>Bio</Header>
          <p>{bio}</p>
        </Container>
      </div>
      {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}
    </div>
  );
}

export default Sidebar;