import React, { useState, useEffect } from "react";
import AlbumCard from "./AlbumCard";

function RecommendedPage({ spotify, username }) {
  const [seedArtistIds, setSeedArtistIds] = useState([]);
  const [recommendedAlbums, setRecommendedAlbums] = useState([]);

  useEffect(() => {
    let token = window.localStorage.getItem("token");
    spotify.setAccessToken(token);
    spotify.getMyTopArtists({ limit: 50 }).then((data) => {
      const artistObjs = data.items;
      const artistIds = artistObjs.map((artist) => artist.id);
      setSeedArtistIds(artistIds);
    });
  }, []);

  useEffect(() => {
    if (seedArtistIds.length > 0) {
      const fiveRandom = pickFiveRandom(seedArtistIds);
      let token = window.localStorage.getItem("token");
      spotify.setAccessToken(token);
      spotify
        .getRecommendations({ seed_artists: fiveRandom, limit: 50 })
        .then((data) => {
          const albums = data.tracks.map((track) => track.album);
          setRecommendedAlbums(albums);
        });
    }
  }, [seedArtistIds]);

  function pickFiveRandom(arr) {
    const result = [];
    for (let i = 0; i < 5; i++) {
      const index = Math.floor(Math.random() * (arr.length - 1));
      const item = arr[index];
      if (result.includes(item)) {
        result.push(arr[index + 1]);
      } else {
        result.push(item);
      }
    }
    return result;
  }

  const recommendedAlbumItems = recommendedAlbums.map((album, i) => (
    <AlbumCard key={i} index={i} album={album} />
  ));

  return <div>{recommendedAlbumItems}</div>;
}

export default RecommendedPage;
