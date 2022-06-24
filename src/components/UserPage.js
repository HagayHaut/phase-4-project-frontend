import React from "react";
import RecentlyPlayed from "./RecentlyPlayed";
import styled from "styled-components";

const Container = styled.div`
    align-content: center;
    text-align: center;
`;

const Welcome = styled.h2`
    font-size: 2.5rem;
    margin: 0;
    padding-top: 2rem;
`;

const UserName = styled.a`
    color: white;
    text-decoration: none;
    &:hover {
        color: #1db954;
    }
    margin: 0;
    padding: 0;
`;

const Image = styled.img`
    border-radius: 50%;
    width: 300px;
    height: 300px;
    object-fit: cover;
    margin: 1rem;
`;

function UserPage({
    user,
    currentlyPlaying,
    numberArtistsFollowing,
    recentlyPlayed,
}) {
    const { display_name, images, external_urls, followers } = user;
    // console.log(currentlyPlaying)

    if (!user.display_name) return <></>;

    return (
        <Container>
            <Welcome>
                Welcome,{" "}
                <UserName href={external_urls.spotify} target="_blank">
                    {display_name}
                </UserName>
                !
            </Welcome>
            <Image src={images[0].url} alt="Profile Photo" />
            <div>
                <p>Followers: {followers.total}</p>
                <p>Following: {numberArtistsFollowing}</p>
                <h3>Currently Playing:</h3>
                <p>
                    {currentlyPlaying.item.name
                        ? `${currentlyPlaying.item.artists[0].name} - ${currentlyPlaying.item.name}`
                        : "Nothing currently playing"}{" "}
                </p>
            </div>
            <h3>Recently Played:</h3>
            <RecentlyPlayed recentlyPlayed={recentlyPlayed} />
        </Container>
    );
}

export default UserPage;
