import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';


const NavUl = styled.ul`
  list-style-type: none;
  margin: 0;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-end;
  text-decoration: none;
  background: #212121;
  overflow: hidden;
  top: 0;
`;

const linkStyle = {
  margin: "1rem",
  textDecoration: "underline",
  color: '#1DB954'
}


function NavBar({ username }) {
  return (
    <NavUl>
          <Link to="/" style={linkStyle}>
            {username}
          </Link>
          <Link to="/artists" style={linkStyle}>
            Artists
          </Link>
    </NavUl>
  );
}

export default NavBar;
