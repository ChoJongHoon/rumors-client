import React from "react";
import styled from "styled-components";
import oc from "open-color";
import { media } from "lib/styleUtils";

const Background = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: ${oc.violet[5]};
`;

const Message = styled.div`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  text-align: center;
  font-size: 3rem;
  color: ${oc.gray[0]};
  font-weight: 800;
  ${media.tablet`
    font-size: 2rem;
    font-weight: 600;
  `}
`;

const ErrorWrapper = ({ children }) => {
  return (
    <Background>
      <Message>{children}</Message>
    </Background>
  );
};

export default ErrorWrapper;
