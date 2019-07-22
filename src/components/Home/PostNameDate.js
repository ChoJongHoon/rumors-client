import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 0.25rem;
`;

const Name = styled.div`
  font-size: 1rem;
  font-weight: 600;
`;

const Date = styled.div`
  font-size: 0.75rem;
  color: #616770;
`;

const PostNameDate = ({ children, date }) => {
  return (
    <Wrapper>
      <Name>{children}</Name>
      <Date>{date}</Date>
    </Wrapper>
  );
};

export default PostNameDate;
