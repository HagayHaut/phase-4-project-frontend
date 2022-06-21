import React, { useEffect, useState } from "react";
import Track from "./Track";
import styled from "styled-components";

const TrackContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function TrackPage({ spotify }) {
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    spotify
      .getMyTopTracks({ limit: 50 })
      .then((data) => setTopTracks(data.items));
  });

  const trackItems = topTracks.map((track, i) => (
    <Track key={i} index={i} track={track} />
  ));

  return (
    <div className="track-page">
      <TrackContainer>{trackItems}</TrackContainer>
    </div>
  );
}

export default TrackPage;
