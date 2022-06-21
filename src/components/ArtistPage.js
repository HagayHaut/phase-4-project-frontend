import React, { useState, useEffect } from "react";
import ArtistCard from "./ArtistCard";
import styled from "styled-components";

const TopArtists = styled.h2`
  text-align: center;
  margin: 0;
  padding: 0;
  font-size: 1.5rem;
`;

function ArtistPage({ spotify, username }) {
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    spotify
      .getMyTopArtists({ limit: 50 })
      .then((data) => setTopArtists(data.items));
  });

  const artistCards = topArtists.map((artist, index) => (
    <ArtistCard key={index} artist={artist} index={index} />
  ));

  return (
    <div>
      <TopArtists>{username}'s Top Artists</TopArtists>
      <div className="artist-page">{artistCards}</div>
    </div>
  )
}

export default ArtistPage;
