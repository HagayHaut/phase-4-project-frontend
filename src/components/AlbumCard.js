import React from "react";

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
    <div>
      <a href={external_urls.spotify} target="_blank">
        <img src={images[1].url} alt="album cover" />
      </a>

      <h4>{name}</h4>
      <h5>{release_date.slice(0, 4)}</h5>
      <h5>{formatArtists()}</h5>
      <h5>{album_type}</h5>
    </div>
  );
}

export default AlbumCard;
