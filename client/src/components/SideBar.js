import React from "react";
import {Image, Header, Container} from "semantic-ui-react";


function Sidebar({bio,username,profile_pic, full_name, user, userId}) {
  
  console.log(userId)
  
  const profileRoute = `/profile/${userId}`

  return (
    
    <div className= 'bg-[#A1A485]'>
      <div className="sidebar bg-[#A1A485]">
        {/* <a href= {profileRoute}> */}
          <Image className = "uhhh" src= {profile_pic} size='big' circular alt="User Pic"/>
        {/* </a> */}

        <div className="flex flex-col place-items-center mt-6">
          <Header as='h2' placeholder="Hackerman" className='mx auto '>{username}</Header>
          <Container>
            <Header as='h2'>Bio</Header>
            <p>{bio}</p>
          </Container>
        </div>

      </div>
    </div>
  );
}

export default Sidebar;