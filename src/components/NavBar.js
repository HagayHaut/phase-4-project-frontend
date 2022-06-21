import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const NavContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    padding-left: 25rem;
    padding-right: 25rem;
`

function NavBar({ username }) {
  return (
    <NavContainer>
      
          <Link to="/">
            <h3>{username}</h3>
          </Link>

          <Link to="/artists">
            <h3>Artists</h3>
          </Link>

    </NavContainer>
  );
}

export default NavBar;
