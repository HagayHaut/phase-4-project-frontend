import React, { useState, useEffect } from "react";
import ArtistCard from "./ArtistCard";
import styled from "styled-components";

const TopArtists = styled.h2`
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

const Cont = styled.div`
  justify-content: center;
  margin-left: 20rem;
  margin-right: 20rem;
  @media (min-width: 1555px) and (max-width: 1715px) {
    margin-left: 15rem;
    margin-right: 15rem;
  }
  @media (min-width: 1395px) and (max-width: 1555px) {
    margin-left: 10rem;
    margin-right: 10rem;
  }
  @media (min-width: 805px) and (max-width: 1395px) {
    margin-left: 5rem;
    margin-right: 5rem;
  }
  @media (min-width: 645px) and (max-width: 805px) {
    margin-left: 1rem;
    margin-right: 1rem;
  }
  @media (max-width: 645px) {
    margin: 0;
  }
`;

const ArtistContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(215px, 1fr));
  grid-auto-rows: auto;
  width: 100%;
`;

const ArtistPageContainer = styled.div``;

const Input = styled.input`
  accent-color: #1db954;
`;

function ArtistPage({ spotify, username, prevTopArtists }) {
  const [topArtists, setTopArtists] = useState([]);
  const [showAllTime, setShowAllTime] = useState(false);

  useEffect(() => {
    let token = window.localStorage.getItem("token");
    spotify.setAccessToken(token);

    const timeRange = showAllTime ? "long_term" : "medium_term";
    spotify
      .getMyTopArtists({ limit: 50, time_range: timeRange })
      .then((data) => {
        setTopArtists(compareToPrev(prevTopArtists, data.items));
      });
  }, [showAllTime]);

  function compareToPrev(prev, curr) {
    const updatedCurr = curr.map((artist, i) => {
      const compareIdx = prev.indexOf(artist.name);
      if (compareIdx < i) {
        return { ...artist, update: -1 };
      } else if (compareIdx > i) {
        return { ...artist, update: 1 };
      } else {
        return { ...artist, update: 0 };
      }
    });
    return updatedCurr;
  }

  const artistCards = topArtists.map((artist, index) => (
    <ArtistCard key={index} artist={artist} index={index} />
  ));

  return (
    <ArtistPageContainer>
      <TopArtists>{username}'s Top Artists</TopArtists>
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

      <Cont>
        <ArtistContainer>{artistCards}</ArtistContainer>
      </Cont>
    </ArtistPageContainer>
  );
}

export default ArtistPage;
