import React from "react";
import Track from "./Track";
import styled from "styled-components";

const TrackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function RecentlyPlayed({ recentlyPlayed }) {
  const trackItems = recentlyPlayed.map((obj, i) => (
    <Track key={i} index={i} track={obj.track} />
  ));

  return <TrackContainer>{trackItems}</TrackContainer>;
}

export default RecentlyPlayed;
