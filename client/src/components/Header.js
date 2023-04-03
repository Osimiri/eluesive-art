import React from 'react'
import {NavLink} from "react-router-dom";

function Header() {
    return(
    <header>
        <div classname = 'nav' style={{ margin: "0 auto" }}>
        <nav>
            <div className="Route Buttons">
            <NavLink exact to="/" activeClassName="active-nav-link" className="nav-btn">
            <span>Home</span>
            </NavLink>
            <NavLink exact to="/books" activeClassName="active-nav-link" className="nav-btn">
            <span>Books</span>
            </NavLink>
            <NavLink exact to="/authors" activeClassName="active-nav-link" className="nav-btn">
            <span>Authors</span>
            </NavLink>
            {/* <NavLink exact to="/profile" activeClassName="active-nav-link" className="nav-btn">
            <span>Profile</span>
            </NavLink> */}
            <NavLink exact to="/submit" activeClassName="active-nav-link" className="nav-btn">
            <span>Submit</span>
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