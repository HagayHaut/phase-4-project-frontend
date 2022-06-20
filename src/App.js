import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import "./App.css";

const spotify = new SpotifyWebApi();

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

function App() {
  // const [spotifyToken, setSpotifyToken] = useState("")
  const [token, setToken] = useState("");

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

      spotify.getMyTopArtists().then((user) => {
        console.log("Top Artists:", user);
      });

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

      spotify.getMe().then((user) => {
        console.log("Get me:", user);
      });
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify React</h1>
        {!token ? (
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join(
              "%20"
            )}&response_type=${RESPONSE_TYPE}`}
          >
            Login to Spotify
          </a>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
      </header>
    </div>
  );
}

export default App;
