import React from "react";
import styled from "styled-components";

const TextArea = styled.textarea`
  width: 100%;
  resize: none;
  box-sizing: border-box;
  border: none;
  font-size: 1rem;
`;

const ModalTextAread = ({ children, ...rest }) => {
  return <TextArea {...rest} value={children} />;
};

export default ModalTextAread;
