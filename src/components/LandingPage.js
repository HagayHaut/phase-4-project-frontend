import React from "react";
import styled from "styled-components";

const CLIENT_ID = "878d9404dd554f08bb469f543d450541";
const REDIRECT_URI = "https://spats.hagayhaut.com";
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
const URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join(
  "%20"
)}&response_type=${RESPONSE_TYPE}`;

const Button = styled.a`
  background: #1db954;
  padding: 20px;
  border-radius: 99px;
  cursor: pointer;
  font-weight: 800;
  text-decoration: none;
  color: black;
  margin-top: 1rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50rem;
`;

const SpatsContainer = styled.div`
  margin: 0;
  margin-top: 3rem;
`;

const ContentContainer = styled.div`
  margin-bottom: 1rem;
  font-size: 2rem;
`;

const Title = styled.h1`
  font-family: "Sedgwick Ave Display", cursive;
  font-style: italic;
  color: white;
  display: flex;
  flex-direction: column;
  font-size: 8rem;
  margin: 0;
`;

const Footer = styled.footer`
  text-align: center;
`;

const BackGround = styled.div`
  height: 100vh;
`;

const ByP = styled.span`
  color: #1db954;
`;

const ATags = styled.a`
  text-decoration: none;
`;

function LandingPage() {
  return (
    <BackGround>
      <Container>
        <SpatsContainer>
          <Title>Spats</Title>
        </SpatsContainer>
        <div class="loader">
          <span class="stroke"></span>
          <span class="stroke"></span>
          <span class="stroke"></span>
          <span class="stroke"></span>
          <span class="stroke"></span>
          <span class="stroke"></span>
          <span class="stroke"></span>
        </div>
        <ContentContainer>Spotify Stat Tracker</ContentContainer>
        <Button href={URL}>LOGIN WITH SPOTIFY</Button>
      </Container>
      <Footer>
        created by{" "}
        <ATags href="https://github.com/HagayHaut" target="_blank">
          <ByP>Hagay Haut</ByP>
        </ATags>{" "}
        ,{" "}
        <ATags href="https://github.com/bradbieselin" target="_blank">
          <ByP>Brad Bieselin</ByP>
        </ATags>{" "}
        and{" "}
        <ATags href="https://github.com/murphy-mi/" target="_blank">
          <ByP>Max Murphy</ByP>
        </ATags>
      </Footer>
    </BackGround>
  );
}

export default LandingPage;
