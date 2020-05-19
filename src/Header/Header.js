import React, { useContext, useState } from "react";
import "../App.css";
import logo from "../Images/logo.png";
import { Link, useHistory, NavLink } from "react-router-dom";

import AuthContext from "../Auth/AuthContext";

export default function Header() {
  const { user, setUser } = useContext(AuthContext);
  const [searchInput, setSearchInput] = useState("");
  const history = useHistory();

  function handleLogout(e) {
    e.preventDefault();
    setUser(null);
    localStorage.removeItem("user");
  }

  function handleSearch(e) {
    setSearchInput(e.currentTarget.value);
    history.push("/?q=" + e.currentTarget.value);
  }

  return (
    <>
      <nav className="nav-bar">
        
        <NavLink exact to="/"><img className="logo" src={logo} alt="Logo" /></NavLink>

        <form className="search-bar">
          <input
            value={searchInput}
            onChange={handleSearch}
            type="text"
            placeholder="What can I find for you?"
            aria-label="Search"
          />
        </form>

        <ul className="list">
          <li>
            <Link className="navbar-link home" to="/">
              Home
            </Link>

            {user ? (
              <>
                <div className="username">
                  <span>Welcome,</span> {user.username}
                </div>
                <a href="/" className="navbar-link" onClick={handleLogout}>
                  Logout
                </a>
                <div className="profile">
                  <Link to="/Profile"></Link>
                </div>
              </>
            ) : (
              <>
                <Link className="navbar-link" to="/Login">
                  Login
                </Link>
                <Link className="navbar-link" to="/Register">
                  Register
                </Link>
              </>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}
