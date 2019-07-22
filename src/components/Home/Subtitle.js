import React from "react";
import styled from "styled-components";
import { media } from "lib/styleUtils";

const Wrapper = styled.div`
  margin: 0.8rem;
`;

const Text = styled.h2`
  ${media.tablet`
        font-size: 1.25rem;
        font-weight: 600;
    `}
`;

const Subtitle = ({ children }) => {
  return (
    <Wrapper>
      <Text>{children}</Text>
    </Wrapper>
  );
};

export default Subtitle;
