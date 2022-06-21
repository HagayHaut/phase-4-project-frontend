import React, { useState, useEffect } from "react";
import ArtistCard from "./ArtistCard";

function ArtistPage({ spotify }) {
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    spotify
      .getMyTopArtists({ limit: 50 })
      .then((data) => setTopArtists(data.items));
  });

  const artistCards = topArtists.map((artist, index) => (
    <ArtistCard key={index} artist={artist} index={index} />
  ));

  return <div className="artist-page">{artistCards}</div>;
}

export default ArtistPage;
