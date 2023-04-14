import React, { useState, useEffect, useContext } from "react";
import SideBar from "./SideBar";
import ProjectCard from "./ProjectCard";
import NewProjectModal from "./NewProjectModal";
import { UserContext } from "./UserProvider";

function UserProfilePage(props) {
  const [user, setUser] = useContext(UserContext);
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const bio = user.biography;
  const full_name = user.full_name;
  const profile_pic = user.image_url;
  const username = user.username;
  
  useEffect(() => {
    fetch(`/projects_user/${user.id}`)
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  function refreshProject(){
      fetch(`/projects_user/${user.id}`)
        .then((res) => res.json())
        .then((data) => setProjects(data));
  }
  

  return (
    <div className="user-profile-page">
      {user && (
        <>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              // projectId={project.id}
              title={project.title}
              likes={project.likes}
              image={project.image_url}
              description={project.description}
              creator={project.creator}
            />
          ))}

          <SideBar
            user={user}
            bio={bio}
            username={username}
            profile_pic={profile_pic}
            full_name={full_name}
          />
          
          <NewProjectModal open={showModal} setOpen={setShowModal} refreshProject= {refreshProject} />
        </>
      )}
    </div>
  );
}

export default UserProfilePage;

// import React, { useState, useEffect, useContext } from "react";
// import SideBar from "./SideBar";
// import ProjectCard from "./ProjectCard";
// import NewProjectModal from "./NewProjectModal";
// import { UserContext } from "./UserProvider";
// // import { Button, Modal, Form } from "semantic-ui-react";

// function UserProfilePage(props) {
//   const [user, setUser] = useContext(UserContext);
//   const [projects, setProjects] = useState([]);
//   // const [profile, setProfile] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   console.log(user)

//   const bio = user.biography;
//   const full_name = user.full_name;
//   const profile_pic = user.image_url;
//   const username = user.username;
  
//   useEffect(() => {
//     fetch(`/projects_user/${user.id}`)
//       .then((res) => res.json())
//       .then((data) => setProjects(data));
//   }, []);

//   console.log(projects)
//   return (
//     <div className="user-profile-page">
//       {user && (
//         <>
//           {projects.length > 0 && (
//             <ProjectCard
//               projectId={projects.id}
//               title={projects.title}
//               // users={projects.users.map((user) => user.user)}
//               likes={projects.likes}
//               image={projects.image_url}
//               description={projects.description}
//               creator={projects.creator}
//             />
//           )}

//           <SideBar
//             user={user}
//             bio={bio}
//             username={username}
//             profile_pic={profile_pic}
//             full_name={full_name}
//           />
          
//           <NewProjectModal open={showModal} setOpen={setShowModal} />
//         </>
//       )}
//     </div>
//   );
// }

// export default UserProfilePage;