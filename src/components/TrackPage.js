import React, { useEffect, useState } from "react";
import TopTrack from "./TopTrack";
import styled from "styled-components";

const TrackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function TrackPage({ spotify }) {
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    spotify
      .getMyTopTracks({ limit: 50 })
      .then((data) => setTopTracks(data.items));
  });

  const trackItems = topTracks.map((track, i) => (
    <TopTrack key={i} index={i} track={track} />
  ));

  return (
      <TrackContainer>{trackItems}</TrackContainer>
  );
}

export default TrackPage;
