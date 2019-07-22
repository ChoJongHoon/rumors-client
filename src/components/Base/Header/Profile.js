import React from "react";
import styled from "styled-components";
import { media } from "lib/styleUtils";

const UserProfile = styled.img`
  position: absolute;
  right: 0;
  top: 0;
  margin: 1rem;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  background-size: cover;
  background-repeat: no-repeat;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  ${media.tablet`
    width: 2.25rem;
    height: 2.25rem;
  `}
`;
const Profile = ({ src, ...rest }) => {
  return (
    <UserProfile
      src={process.env.REACT_APP_SERVER_HOST + "/images/profile/" + src}
      alt="profile"
      {...rest}
    />
  );
};

export default Profile;
