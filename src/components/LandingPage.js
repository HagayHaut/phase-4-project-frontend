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

const Button = styled.a`
  background: #1db954;
  padding: 20px;
  border-radius: 99px;
  cursor: pointer;
  font-weight: 800;
  text-decoration: none;
  color: black;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(90deg, rgba(18,18,18,1) 0%, rgba(33,33,33,1) 50%, rgba(18,18,18,1) 100%);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
`;


function LandingPage() {

  return (
    <Container>
      <Button href={URL}>LOGIN WITH SPOTIFY</Button>
    </Container>
  );
}

export default LandingPage;
