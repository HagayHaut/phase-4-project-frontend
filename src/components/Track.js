import React from "react";
import styled from "styled-components";

const TrackItem = styled.a`
  display: flex;
  margin: 1rem;
  border-radius: 15px;
  height: 75px;
  width: 50%;
  background: #2b2b2b;
  color: white;
  text-decoration: none;
  &:hover {
    background-color: #535353;
  }
  cursor: pointer;

  @media (min-width: 890px) and (max-width: 1355px) {
    width: 75%;
  }

  @media (min-width: 390px) and (max-width: 890px) {
    width: 100%;
  }
`;

const Image = styled.img`
  height: 75px;
  width: 75px;
`;

const Index = styled.div`
  width: 4.5rem;
  background: #1DB954;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  padding-top: 1.5rem;
  font-size: 1.5rem;
`;

const SongContent = styled.div`
  width: 95%;
  height: 100%;
  overflow: hidden;
`;

const AlbumYear = styled.div`
  width: 5%;
  text-align: right;
  margin: 1.5rem;
`;

const SongName = styled.div`
  margin: .5rem;
  text-align: left;
  font-size: 1rem;
  font-weight: 900;
  @media(max-width: 657px) {
    font-size: .9rem;
  }
`;

const ArtistName = styled.div`
  margin: .5rem;
  text-align: left;
  font-size: 1rem;
  font-weight: 100;
  color: #A9A9A9;
  @media(max-width: 657px) {
    font-size: .9rem;
  }
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
      result += ` and ${artistNames[artistNames.length - 1]}`;
    }
    return result;
  }

  function getAlbumYear() {
    return album.release_date.substr(0, 4);
  }

  return (
    <TrackItem href={external_urls.spotify} target="_blank">
      <Index>{`${index + 1}`}</Index>
      <Image
        src={album.images[album.images.length - 1].url}
        alt="album cover"
      />
      <SongContent>
        <SongName>{`${name}`}</SongName>
        <ArtistName>{formatArtists()}</ArtistName>
      </SongContent>
      <AlbumYear>{getAlbumYear()}</AlbumYear>
    </TrackItem>
  );
}

export default Track;
