import React from "react";
import styled from 'styled-components';

const CLIENT_ID = "ee76b712a77f48d9b3cb9f643c58c777";
const REDIRECT_URI = "http://localhost:4000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const scopes = [
  "user-read-recently-played",
  "user-read-playback-position",
  "user-top-read",
  "user-follow-read",
  "playlist-read-private",
  "user-library-read",
  "user-read-currently-playing",
  "user-read-playback-state",
];
const URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join("%20")}&response_type=${RESPONSE_TYPE}`

const Button = styled.button`
  background: #1db954;
  color: black;
  padding: 1rem;
  border-radius: 50px;
  cursor: pointer;
  margin: 1rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #212121;
`;


function LandingPage() {

  function handleLogin() {
    window.location.href = URL;
  }

  return (
    <Container>
      <Button onClick={handleLogin}>Login To Spotify</Button>
    </Container>
  );
}

export default LandingPage;
