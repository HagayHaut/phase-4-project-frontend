import React from "react";
import styled from "styled-components";

function UserPage({ user }) {
  const { display_name, images, external_urls } = user;

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
    </div>
  );
}

export default UserPage;
