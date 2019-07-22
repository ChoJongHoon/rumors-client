import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 1rem;
`;

const PostText = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default PostText;
