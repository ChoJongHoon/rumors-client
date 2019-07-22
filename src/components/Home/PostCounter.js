import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBroadcastTower, faComment } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  padding: 1rem;
  color: #606770;
  font-size: 0.9rem;
`;

const Like = styled.div`
  float: left;
`;
const Comment = styled.div`
  float: right;
`;

const PostCounter = ({ like, comment }) => {
  return (
    <Wrapper>
      <Like>
        <FontAwesomeIcon icon={faBroadcastTower} /> {like}
      </Like>
      <Comment>
        <FontAwesomeIcon icon={faComment} /> {comment}
      </Comment>
    </Wrapper>
  );
};

export default PostCounter;
