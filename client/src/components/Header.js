import React from 'react'
import {NavLink} from "react-router-dom";

function Header({user, setUser}) {

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setUser(null);
          }
        });
      }

    return(
    <header>
        <div classname = 'nav' style={{ margin: "0 auto" }}>
        <nav>
            <div className="Route Buttons">

            <NavLink exact to="/" activeClassName="active-nav-link" className="nav-btn">
            <span>Home</span>
            </NavLink>
            
            <NavLink exact to="/submit" activeClassName="active-nav-link" className="nav-btn">
            <span>Submit</span>
            </NavLink>
            
            <NavLink exact to="/" onClick={handleLogoutClick} className="nav-btn">
            <span>LogOut</span>
            </NavLink>
            
            </div>
    
        </nav>

        </div>
        {/* <div>
            <h1>Welcome to Better Reads</h1>
        </div> */}

    </header>
    )
}
export default Header;