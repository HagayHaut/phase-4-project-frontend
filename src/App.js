import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import "./App.css";
import UserPage from "./components/UserPage";
import LandingPage from "./components/LandingPage";
import NavBar from "./components/NavBar";
import ArtistPage from "./components/ArtistPage";
import TrackPage from "./components/TrackPage";
import RecommendedPage from "./components/RecommendedPage";
import styled from "styled-components";

const spotify = new SpotifyWebApi();

const Header = styled.header`
  width: 100%;
  position: sticky;
  top: 0;
`;

const Content = styled.div`
  background: linear-gradient(
    90deg,
    rgba(18, 18, 18, 1) 0%,
    rgba(33, 33, 33, 1) 50%,
    rgba(18, 18, 18, 1) 100%
  );
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
`;

function App() {
  // const [spotifyToken, setSpotifyToken] = useState("")
  const initialUserProfile = {
    display_name: "",
    images: [{ url: "" }],
    external_urls: { spotify: "" },
  };

  const initialCurrentlyPlaying = {
    item: {
      name: "",
      artists: [{ name: "" }],
    },
  };

  const [token, setToken] = useState("");
  const [userProfile, setUserProfile] = useState(initialUserProfile);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(
    initialCurrentlyPlaying
  );
  const [numberArtistsFollowing, setNumberArtistsFollowing] = useState(0);
  const [prevTopArtists, setPrevTopArtists] = useState([]);
  const [railsUser, setRailsUser] = useState({});

  let navigate = useNavigate();

  useEffect(() => {
    // localStorage.clear();
    const hours = 1;
    const timeNow = new Date().getTime();

    const setupTime = localStorage.getItem("setupTime");
    if (setupTime === null) {
      localStorage.setItem("setupTime", timeNow);
    } else {
      if (timeNow - setupTime > hours * 60 * 60 * 1000) {
        localStorage.clear();
        localStorage.setItem("setupTime", timeNow);
      }
    }

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
    }
    spotify.setAccessToken(token);

    spotify.getMyRecentlyPlayedTracks({ limit: 50 }).then((data) => {
      setRecentlyPlayed(data.items);
    });
    spotify.getFollowedArtists().then((user) => {
      setNumberArtistsFollowing(user.artists.total);
    });
    spotify.getMyCurrentPlayingTrack().then((data) => {
      console.log(data);
      if (data) {
        setCurrentlyPlaying(data);
      }
    });
    spotify
      .getRecommendations({
        seed_artists: ["5Z1XZyEFY0dewG8faEIiEx", "2te8VJxgUxcElC8Uq6eJs6"],
      })
      .then(console.log);
    spotify.getMe().then((data) => {
      setUserProfile(data);
      handleUserLogin(data);
    });

    setToken(token);
  }, []);

  //   useEffect(() => {
  //     fetch(`http://localhost:3000/prev_top_artistlist/${railsUser.id}`)
  //       .then((res) => res.json())
  //       .then(setPrevTopArtists);
  //   }, [railsUser]);

  function handleUserLogin(userObj) {
    const name = userObj.display_name;
    const user = { name: name };

    // fetch("http://localhost:3000/users")
    //   .then((res) => res.json())
    //   .then((users) => {
    //     const returningUser = users.find((user) => user.name === name);
    //     if (returningUser) {
    //       setRailsUser(returningUser);
    //     } else {
    //       fetch("http://localhost:3000/users", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(user),
    //       })
    //         .then((res) => res.json())
    //         .then(setRailsUser);
    //     }
    //   });
    // GET all users from rails
    // check if name is included
    // if yes, just setRailsUser(that user)
    // else, we go ahead with the fetch below
  }

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
    setUserProfile(initialUserProfile);
    setCurrentlyPlaying(initialCurrentlyPlaying);
    setRecentlyPlayed([]);
    setRailsUser({});
    setPrevTopArtists([]);
    setNumberArtistsFollowing(0);
    navigate("/");
  };

  return (
    <>
      <Header>
        {userProfile.display_name ? (
          <NavBar username={userProfile.display_name} logout={logout} />
        ) : null}
      </Header>
      <Content>
        {!token ? <LandingPage /> : null}

        <Routes>
          <Route
            path="/"
            element={
              <UserPage
                numberArtistsFollowing={numberArtistsFollowing}
                currentlyPlaying={currentlyPlaying}
                recentlyPlayed={recentlyPlayed}
                user={userProfile}
              />
            }
          />
        </Routes>
        <Routes>
          <Route
            path="/artists"
            element={
              <ArtistPage
                spotify={spotify}
                username={userProfile.display_name}
                railsUser={railsUser}
                prevTopArtists={prevTopArtists}
              />
            }
          />
          <Route
            path="/tracks"
            element={
              <TrackPage
                spotify={spotify}
                username={userProfile.display_name}
              />
            }
          />
          <Route
            path="/recommended"
            element={
              <RecommendedPage
                spotify={spotify}
                username={userProfile.display_name}
              />
            }
          />
        </Routes>
      </Content>
    </>
  );
}

export default App;
