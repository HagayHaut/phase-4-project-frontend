import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import "./App.css";
import UserPage from "./components/UserPage";
import LandingPage from "./components/LandingPage";
import NavBar from "./components/NavBar";
import ArtistPage from "./components/ArtistPage";
import styled from 'styled-components';

const spotify = new SpotifyWebApi();

const Container = styled.div`
  background-color: #212121;
  position:absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
`;

const Content = styled.div`
  background: #212121;
`;

function App() {
  // const [spotifyToken, setSpotifyToken] = useState("")
  const initialUserProfile = {
    display_name: "",
    images: [{ url: "" }],
    external_urls: { spotify: "" },
  };
  const [token, setToken] = useState("");
  const [userProfile, setUserProfile] = useState(initialUserProfile);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);

      setToken(token);

      spotify.setAccessToken(token);

      spotify.getMyTopTracks().then((user) => {
        console.log("Top Tracks:", user);
      });

      spotify.getMyRecentlyPlayedTracks().then((user) => {
        console.log("Recent Tracks:", user);
      });

      spotify.getMySavedAlbums().then((user) => {
        console.log("Saved albums:", user);
      });

      spotify.getFollowedArtists().then((user) => {
        console.log("Following:", user);
      });

      spotify.getMyCurrentPlayingTrack().then((user) => {
        console.log("Currently playing:", user);
      });

      spotify.getMe().then(setUserProfile);
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
    setUserProfile(initialUserProfile);
  };

  return (
    <Container>
      <Header>
        {userProfile.display_name ? <NavBar username={userProfile.display_name} /> : null}
      </Header>
      <Content>
        {!token ? <LandingPage /> : <button onClick={logout}>Logout</button>}

        <Routes>
          <Route path="/" element={<UserPage user={userProfile} />} />
        </Routes>
        <Routes>
          <Route path="/artists" element={<ArtistPage spotify={spotify} />} />
        </Routes>
      </Content>
    </Container>
  );
}

export default App;
