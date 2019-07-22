import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  padding: 1rem;
`;

const PostHeader = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default PostHeader;
