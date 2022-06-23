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
  font-size: 2.5rem;
  margin: 0;
  padding-top: 2rem;
`;

const FilterContainer = styled.div`
  text-align: center;
  margin: 1rem;
  display: flex;
  justify-content: center;
`;

const LabelContainer = styled.div`
  margin: 1rem;
`;

const Input = styled.input`
  accent-color: #1DB954;
`;

function TrackPage({ spotify, username }) {
  const [topTracks, setTopTracks] = useState([]);
  const [showAllTime, setShowAllTime] = useState(false);

  useEffect(() => {

    let token = window.localStorage.getItem("token");
    spotify.setAccessToken(token);
    
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
      
      <TopTracks>{username}'s Top Tracks</TopTracks>
      <FilterContainer>
        <LabelContainer>
        <label>Past 6 Months</label>
        <Input
          type="radio"
          checked={!showAllTime}
          onChange={() => setShowAllTime((pre) => !pre)}
        ></Input>
        </LabelContainer>
        <LabelContainer>
        <label>All Time</label>
        <Input
          type="radio"
          checked={showAllTime}
          onChange={() => setShowAllTime((pre) => !pre)}
        ></Input>
        </LabelContainer>
      </FilterContainer>
      <TrackContainer>{trackItems}</TrackContainer>
    </div>
  );
}

export default TrackPage;
