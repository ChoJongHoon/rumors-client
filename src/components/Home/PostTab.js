import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wrapper = styled.div`
  display: flex;
  flex: 1 1;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  font-size: 1rem;
  cursor: pointer;
  margin: 0.25rem;
  :hover {
    background-color: #ddd;
  }
`;

const PostTab = ({ icon, children, active, ...rest }) => {
  return (
    <Wrapper style={active ? { color: "#845ef7" } : {}} {...rest}>
      <FontAwesomeIcon icon={icon} />
      &nbsp;&nbsp;{children}
    </Wrapper>
  );
};

export default PostTab;
