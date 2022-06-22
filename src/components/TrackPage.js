import React, { useEffect, useState } from "react";
import TopTrack from "./TopTrack";
import styled from "styled-components";

const TrackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopTracks = styled.h2`
  text-align: center;
  margin: 0;
  padding: 0;
  font-size: 1.5rem;
`;

function TrackPage({ spotify, username }) {
  const [topTracks, setTopTracks] = useState([]);
  const [showAllTime, setShowAllTime] = useState(false);

  useEffect(() => {
    const timeRange = showAllTime ? "long_term" : "medium_term";
    spotify
      .getMyTopTracks({ limit: 50, time_range: timeRange })
      .then((data) => setTopTracks(data.items));
  }, [showAllTime]);

  const trackItems = topTracks.map((track, i) => (
    <TopTrack key={i} index={i} track={track} />
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
      <TopTracks>{username}'s Top Tracks</TopTracks>
      <TrackContainer>{trackItems}</TrackContainer>
    </div>
  );
}

export default TrackPage;
