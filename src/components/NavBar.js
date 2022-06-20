import React from "react";
import { Link } from "react-router-dom";

function NavBar({ username }) {
  return (
    <div>
      {username && (
        <Link to="/">
          <h3>{username}</h3>
        </Link>
      )}
      <Link to="/artists">
        <h3>Artists</h3>
      </Link>
    </div>
  );
}

export default NavBar;
