import React from "react";
import styled from "styled-components";

const Imgage = styled.img`
  border-radius: 50%;
  width: 3rem;
  margin-right: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const PostProfile = ({ src }) => {
  return (
    <Imgage
      src={process.env.REACT_APP_SERVER_HOST + "/images/profile/" + src}
      alt="post profile"
    />
  );
};

export default PostProfile;
