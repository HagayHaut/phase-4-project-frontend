import React from "react";
import styled from "styled-components";

const Card = styled.div`
    display: inline-block;
    text-align: center;
    margin: 1rem;
    border-radius: 5px;
    max-width: 300px;
    padding-bottom: 1rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;

    height: 310px;
    background: #2b2b2b;
    color: white;
    &:hover {
        background-color: #535353;
    }
    cursor: pointer;

    @media (max-width: 822px) {
        width: 100%;
        justify-self: center;
        align-self: center;
    }
`;

const ArtistPhoto = styled.img`
    height: 150px;
    width: 150px;
    border-radius: 2%;
    object-fit: cover;
`;

const AlbumDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 2rem;
  padding-left: 2rem;
`

function AlbumCard({ album }) {
  const { name, artists, external_urls, images, release_date, album_type } = album;

  console.log(album_type)
  console.log(formatArtists())

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

  function limitChars(str) {
    return str.length > 35 ? str.substring(0, 32) + '...' : str
  }
  return (
    <Card>
      <a style={{ textDecoration: 'none', color: 'inherit' }} href={external_urls.spotify} target="_blank">
        <AlbumDetails>
          <h5>{release_date.slice(0, 4)}</h5>
          <h5>{album_type}</h5>
        </AlbumDetails>

        <ArtistPhoto src={images[1].url} alt="album cover" />

        <h4>{limitChars(name)}</h4>
        <h5 style={{ marginTop: '0px', color: '#A9A9A9' }}>{limitChars(formatArtists())}</h5>
      </a>
    </Card>
  );
}

export default AlbumCard;
