import React from "react";
import styled from "styled-components";

const TrackItem = styled.div`
  display: block;
  color: black;
  background-color: white;
  margin: 1rem;
`;

function Track({ index, track }) {
  const { album, artists, name, external_urls } = track;

  function formatArtists() {
    let artistNames = artists.map((artist) => artist.name);
    let result = artistNames[0];
    if (artistNames.length > 1) {
      for (let i = 1; i < artistNames.length - 1; i++) {
        result += `, ${artistNames[i]}`;
      }
      result += `, and ${artistNames[artistNames.length - 1]}`;
    }
    return result;
  }

  function getAlbumYear() {
    return album.release_date.substr(0, 4);
  }

  return (
    <TrackItem>
      <a href={external_urls.spotify} target="_blank">
        <img
          src={album.images[album.images.length - 1].url}
          alt="album cover"
        />
      </a>
      <p>{getAlbumYear()}</p>
      <p>{`${index + 1}. ${name}`}</p>
      <p>{formatArtists()}</p>
    </TrackItem>
  );
}

export default Track;
