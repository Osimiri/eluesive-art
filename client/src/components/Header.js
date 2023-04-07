import React from 'react';
import { NavLink } from 'react-router-dom';

function Header({ user, setUser }) {
  function handleLogoutClick() {
    fetch('/logout', { method: 'DELETE' }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <header>
      <div className="nav" style={{ margin: '0 auto' }}>
        <nav className="nav-container">
          <div className="Route Buttons">
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              <li style={{ display: 'inline-block', margin: '0 10px' }}>
                <NavLink exact to="/" className="nav-links">
                  <span className = "nav-text">Home</span>
                </NavLink>
              </li>

              <li style={{ display: 'inline-block', margin: '0 10px' }}>
                <NavLink exact to="/submit" className="nav-links">
                  <span className = "nav-text">Submit</span>
                </NavLink>
              </li>

              <li style={{ display: 'inline-block', margin: '0 10px' }}>
                <NavLink exact to="/" className="nav-links">
                  <span className = "nav-text">Profile</span>
                </NavLink>
              </li>
              
              <li style={{ display: 'inline-block', margin: '0 10px', float: 'right' }}>
                <NavLink exact to="/" onClick={handleLogoutClick} className="nav-links">
                  <span className = "nav-text">LogOut</span>
                </NavLink>
              </li>

            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;