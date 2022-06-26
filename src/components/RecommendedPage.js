import React, { useState, useEffect } from "react";
import AlbumCard from "./AlbumCard";
import styled from "styled-components";

const AlbumContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(215px, 1fr));
    grid-auto-rows: auto;
    width: 100%;
`;

const Recommendations = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin: 0;
  padding-top: 2rem;
  padding-bottom: 2rem;
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

function RecommendedPage({ spotify, username }) {
    const [seedArtistIds, setSeedArtistIds] = useState([]);
    const [recommendedAlbums, setRecommendedAlbums] = useState([]);

    useEffect(() => {
        let token = window.localStorage.getItem("token");
        spotify.setAccessToken(token);
        spotify.getMyTopArtists({ limit: 50 }).then((data) => {
            const artistObjs = data.items;
            const artistIds = artistObjs.map((artist) => artist.id);
            setSeedArtistIds(artistIds);
        });
    }, []);

    useEffect(() => {
        if (seedArtistIds.length > 0) {
            const fiveRandom = pickFiveRandom(seedArtistIds);
            let token = window.localStorage.getItem("token");
            spotify.setAccessToken(token);
            spotify
                .getRecommendations({ seed_artists: fiveRandom, limit: 50 })
                .then((data) => {
                    const albums = data.tracks.map((track) => track.album);
                    setRecommendedAlbums(albums);
                });
        }
    }, [seedArtistIds]);

    function pickFiveRandom(arr) {
        const result = [];
        for (let i = 0; i < 5; i++) {
            const index = Math.floor(Math.random() * (arr.length - 1));
            const item = arr[index];
            if (result.includes(item)) {
                result.push(arr[index + 1]);
            } else {
                result.push(item);
            }
        }
        return result;
    }

    const recommendedAlbumItems = recommendedAlbums.map((album, i) => (
        <AlbumCard key={i} album={album} />
    ));

    return (
        <Cont>
            <Recommendations>{username}'s Recommendations</Recommendations>
            <AlbumContainer>{recommendedAlbumItems}</AlbumContainer>
        </Cont>
    );
}

export default RecommendedPage;
