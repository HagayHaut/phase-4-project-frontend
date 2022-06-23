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
`;

const Image = styled.img`
  height: auto;
  width: auto;
  border-radius: 5px;
`;

const Index = styled.div`
  background: #1DB954;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  font-size: 1.5rem;
  width: 4.5rem;
  padding-top: 1.5rem;
  text-align: center;
`;

const SongContent = styled.div`
  width: 60%;
`;

const SongName = styled.div`
  margin: .5rem;
  text-align: left;
  font-size: 1rem;
  font-weight: 900;
`;

const ArtistName = styled.div`
  margin: .5rem;
  text-align: left;
  font-size: 1rem;
  font-weight: 100;
  color: #A9A9A9;
  `;

const AlbumYear = styled.div`
  width: 50%;
  text-align: right;
  margin: 1.5rem;
`;

function TopTrack({ index, track }) {
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

export default TopTrack;
