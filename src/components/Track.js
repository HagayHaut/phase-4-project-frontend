import React from "react";
import styled from "styled-components";

const TrackItem = styled.div`
  display: block;
  color: black;
  background-color: white;
  margin: 1rem;
`;

function Track({ index, track }) {
  const { album, artists, name } = track;

  function formatArtists() {}

  return (
    <TrackItem>
      <img src={album.images[album.images.length - 1].url} alt="album cover" />
      <p>{`${index + 1}. ${name}`}</p>
    </TrackItem>
  );
}

export default Track;
