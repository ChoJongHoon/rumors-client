import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 1rem;
  color: #606770;
  border-top: 1px solid #ddd;
`;

const PostFooter = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default PostFooter;
