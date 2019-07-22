import React from "react";
import styled from "styled-components";

const Wrapper = styled.ul`
  list-style: none;
  padding: 0 1rem;
  margin: 0;
`;

const PostImageWrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default PostImageWrapper;
