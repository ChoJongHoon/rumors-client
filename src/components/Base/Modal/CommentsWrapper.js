import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  overflow: auto;
  min-height: 30vh;
  max-height: 60vh;
`;

const CommentsWrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default CommentsWrapper;
