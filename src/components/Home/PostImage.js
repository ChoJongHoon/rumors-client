import React from "react";
import styled from "styled-components";

const Wrapper = styled.li`
  display: inline-block;
  width: 8rem;
  height: 8rem;
  border: 1px solid #ddd;
  margin-top: 1rem;
  margin-right: 1rem;
  text-align: center;
  overflow: hidden;
  background-color: #ffffff;
`;

const Image = styled.img`
  width: 8rem;
  height: 8rem;
`;

const PostImage = ({ src }) => {
  return (
    <Wrapper>
      <Image src={process.env.REACT_APP_SERVER_HOST + "/images/" + src} />
    </Wrapper>
  );
};

export default PostImage;
