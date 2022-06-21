import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavUl = styled.ul`
  list-style-type: none;
  margin: 0;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-end;
  background: #212121;
  overflow: hidden;
  top: 0;
`;

const linkStyle = {
  margin: "0.5rem",
  textDecoration: "none",
  color: "#1DB954",
  cursor: "pointer",
};

const NavItem = styled.p`
  margin: 1rem;
  color: "#1DB954";
  cursor: "pointer";
`;

function NavBar({ username, logout }) {
  return (
    <NavUl>
      <Link to="/" style={linkStyle}>
        {username}
      </Link>
      <Link to="/artists" style={linkStyle}>
        Top 20 Artists
      </Link>
      <Link to="/tracks" style={linkStyle}>
        Top 20 Tracks
      </Link>
      <NavItem style={linkStyle} onClick={logout}>
        Logout
      </NavItem>
    </NavUl>
  );
}

export default NavBar;
