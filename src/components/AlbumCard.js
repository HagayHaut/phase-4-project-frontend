import React from "react";
import styled from "styled-components";

const Card = styled.div`
    display: inline-block;
    text-align: center;
    margin: 1rem;
    border-radius: 5px;
    max-width: 200px;
    height: 250px;
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
    margin-top: 2rem;
    border-radius: 50%;
    object-fit: cover;
`;

function AlbumCard({ index, album }) {
  const { name, artists, external_urls, images, release_date, album_type } =
    album;

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

  return (
    <Card>
      <a href={external_urls.spotify} target="_blank">
        <ArtistPhoto src={images[1].url} alt="album cover" />
      </a>

      <h4>{name}</h4>
      <h5>{release_date.slice(0, 4)}</h5>
      <h5>{formatArtists()}</h5>
      <h5>{album_type}</h5>
    </Card>
  );
}

export default AlbumCard;
