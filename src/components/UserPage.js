import React, { useState, useEffect } from "react";
import RecentlyPlayed from "./RecentlyPlayed";
import styled from "styled-components";

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
    <div>
      <div>
        Welcome,{" "}
        <a href={external_urls.spotify} target="_blank">
          {display_name}!
        </a>
      </div>
      <img src={images[0].url} alt="Profile Photo" />
      <div>
        <p>Followers: {followers.total}</p>
        <p>Following: {numberArtistsFollowing}</p>
        <h3>Currently Playing:</h3>
        <p>
          {currentlyPlaying.item.name
            ? `${currentlyPlaying.item.name} by ${currentlyPlaying.item.artists[0].name}`
            : "None"}{" "}
        </p>
      </div>
      <h3>Recently Played:</h3>
      <RecentlyPlayed recentlyPlayed={recentlyPlayed} />
    </div>
  );
}

export default UserPage;
