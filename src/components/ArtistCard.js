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

function ArtistCard({ artist, index }) {
    const { name, genres, external_urls, images, popularity } = artist;

    return (
        <Card>
            <a href={external_urls.spotify} target="_blank">
                <ArtistPhoto src={images[0].url} alt="artist photo" />
            </a>
            <h4>{`${index + 1}. ${name}`}</h4>
        </Card>
    );
}

export default ArtistCard;
