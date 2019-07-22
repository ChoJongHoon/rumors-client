import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  overflow: hidden;
`;

const Profile = styled.img`
  border-radius: 50%;
  margin: 0.5rem;
  width: 3rem;
  height: 3rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  float: left;
  display: block;
`;

const InputWrapper = styled.span`
  display: block;
  overflow: hidden;
  padding: 1rem 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  background-color: #f2f3f5;
  border: 1px solid #ccd0d5;
  border-radius: 18px;
  color: #1c1e21;
  font-size: 1rem;
  padding: 8px 10px;
`;

const CommentInput = ({ children, userProfile, ...rest }) => {
  return (
    <Wrapper>
      <Profile
        src={
          process.env.REACT_APP_SERVER_HOST + "/images/profile/" + userProfile
        }
        alt="profile"
      />

      <InputWrapper>
        <Input value={children} placeholder="댓글을 입력하세요..." {...rest} />
      </InputWrapper>
    </Wrapper>
  );
};

export default CommentInput;
