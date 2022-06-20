import React from "react";

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

function LoginButton() {
  return (
    <a
      href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join(
        "%20"
      )}&response_type=${RESPONSE_TYPE}`}
    >
      Login to Spotify
    </a>
  );
}

export default LoginButton;
