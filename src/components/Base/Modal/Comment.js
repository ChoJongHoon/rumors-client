import React from "react";
import styled from "styled-components";
import oc from "open-color";

const Wrapper = styled.div`
  display: block;
  margin: 0.5rem;
`;

const Profile = styled.img`
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  float: left;
`;

const TextWrapper = styled.div`
  display: inline-block;
`;

const Text = styled.div`
  background-color: #f2f3f5;
  border-radius: 18px;
  box-sizing: border-box;
  color: #1c1e21;
  display: inline-block;
  font-size: 1rem;
  padding: 8px 10px;
`;

const UserName = styled.span`
  font-weight: 700;
  display: block;
  font-size: 0.9rem;
`;

const DateTime = styled.div`
  font-size: 0.75rem;
  color: ${oc.gray[7]};
  padding-left: 0.5rem;
`;

const Comment = ({ userProfile, userName, children, date }) => {
  return (
    <Wrapper>
      <Profile
        src={
          process.env.REACT_APP_SERVER_HOST + "/images/profile/" + userProfile
        }
        alt="profile"
      />
      <TextWrapper>
        <Text>
          <UserName>{userName}</UserName>
          {children.split("\n").map((item, idx) => (
            <span key={idx}>
              {item}
              <br />
            </span>
          ))}
        </Text>
        <DateTime>{date}</DateTime>
      </TextWrapper>
    </Wrapper>
  );
};

export default Comment;
