import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Home from "../components/Home";
import Submit from "../components/Submit";
import Login from "../components/Login";



function App() {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;
  

    
  return(
      <div className="App">
      <Header user = {user} setUser = {setUser}/>

        <Routes>
          <Route path="/" element={<Home />} /> 
          {/* <Route path="/" element={<Home />} />  */}
          {/* <Route path="/profile" element={<Profile users = {users} />} /> */}
          <Route path="/submit" element={<Submit />} />

        </Routes>


      </div>
  )
}



export default App;
