import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import "./App.css";
import UserPage from "./components/UserPage";
import LoginButton from "./components/LoginButton";
import NavBar from "./components/NavBar";
import ArtistPage from "./components/ArtistPage";

const spotify = new SpotifyWebApi();

function App() {
  // const [spotifyToken, setSpotifyToken] = useState("")
  const initialUserProfile = {
    display_name: "",
    images: [{ url: "" }],
    external_urls: { spotify: "" },
  };
  const [token, setToken] = useState("");
  const [userProfile, setUserProfile] = useState(initialUserProfile);
  const [topArtists, setTopArtists] = useState([]);

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
    <div className="App">
      <header className="App-header">
        <NavBar username={userProfile.display_name} />
      </header>
      <div>
        {!token ? <LoginButton /> : <button onClick={logout}>Logout</button>}

        <Routes>
          <Route path="/" element={<UserPage user={userProfile} />} />
        </Routes>
        <Routes>
          <Route path="/artists" element={<ArtistPage spotify={spotify} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
