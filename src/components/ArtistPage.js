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
  const [showAllTime, setShowAllTime] = useState(false);

  useEffect(() => {
    const timeRange = showAllTime ? "long_term" : "medium_term";
    spotify
      .getMyTopArtists({ limit: 50, time_range: timeRange })
      .then((data) => setTopArtists(data.items));
  }, [showAllTime]);

  const artistCards = topArtists.map((artist, index) => (
    <ArtistCard key={index} artist={artist} index={index} />
  ));

  return (
    <div>
      <>
        <label>Past 6 Months</label>
        <input
          type="radio"
          checked={!showAllTime}
          onChange={() => setShowAllTime((pre) => !pre)}
        ></input>
        <label>All Time</label>
        <input
          type="radio"
          checked={showAllTime}
          onChange={() => setShowAllTime((pre) => !pre)}
        ></input>
      </>
      <TopArtists>{username}'s Top Artists</TopArtists>
      <div className="artist-page">{artistCards}</div>
    </div>
  );
}

export default ArtistPage;
