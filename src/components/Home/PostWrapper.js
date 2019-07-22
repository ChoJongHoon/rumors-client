import React from "react";
import styled from "styled-components";
import { shadow } from "lib/styleUtils";

const Wrapper = styled.div`
  margin: 2rem 1rem;
  ${"" /* max-width: 50rem; */}
  background-color: #ffffff;
  ${shadow(1)}
`;

const PostWrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default PostWrapper;
