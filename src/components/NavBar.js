import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavUl = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: flex-end;
`;

const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: "#1DB954",
    cursor: "pointer",
};

const NavItem = styled.p`
    margin: 1rem;
    color: "#1DB954";
    cursor: "pointer";
`;

const NavLogo = styled.p`
    font-family: "Sedgwick Ave Display", cursive;
    font-style: italic;
    color: white;
    list-style-type: none;
    font-size: 1.5rem;
    margin: 1rem;
`;

const NavLogoDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: linear-gradient(
        90deg,
        rgba(18, 18, 18, 1) 0%,
        rgba(33, 33, 33, 1) 50%,
        rgba(18, 18, 18, 1) 100%
    );
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    overflow: hidden;
    top: 0;
`;

function NavBar({ username, logout }) {
    return (
        <NavLogoDiv>
            <NavLogo>Spats</NavLogo>
            <NavUl>
                <Link to="/" style={linkStyle}>
                    {username}
                </Link>
                <Link to="/artists" style={linkStyle}>
                    Top Artists
                </Link>
                <Link to="/tracks" style={linkStyle}>
                    Top Tracks
                </Link>
                <Link to="/recommended" style={linkStyle}>
                    Recommended
                </Link>
                <NavItem style={linkStyle} onClick={logout}>
                    Logout
                </NavItem>
            </NavUl>
        </NavLogoDiv>
    );
}

export default NavBar;
