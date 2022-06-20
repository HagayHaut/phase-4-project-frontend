import React from "react";

function ArtistCard({ artist }) {
  const { name, genres, external_urls, images, popularity } = artist;

  return (
    <div className="artist-card">
      <a href={external_urls.spotify} target="_blank">
        <img className="artist-photo" src={images[0].url} alt="artist photo" />
      </a>
      <h4>{name}</h4>
    </div>
  );
}

export default ArtistCard;
