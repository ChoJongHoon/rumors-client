import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import oc from "open-color";
import { media, shadow } from "lib/styleUtils";

const AppBar = styled.div`
  background-color: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  width: 15rem;
  height: 100%;
  ${shadow(1)}
  ${media.tablet`
    position: absolute;
    height: 4rem;
    width: 100%;
    text-align: center
  `}
`;

const Logo = styled.div`
  cursor: pointer;
  padding: 0 2rem;
  margin-top: 1.75rem;
  margin-bottom: 1.75rem;
  font-size: 2rem;
  line-height: 2rem;
  font-family: Inconsolata;
  color: ${oc.gray[9]};
  display: block;
  position: relative;
  ${media.tablet`
    margin-top: 1rem;
    margin-bottom: 1rem;
  `}
`;

const Menu = styled.div`
  background-color: #ffffff;
  display: block;
  margin-block-start: 1rem;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
  ${media.tablet`
    display: flex;
    width: 100%;
    margin-block-start: 0rem;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
  `}
`;

const MenuItem = styled(Link)`
  color: ${oc.gray[7]};
  cursor: pointer;
  display: flex;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-size: 1.125rem;
  padding-bottom: 0.75rem;
  align-items: center;
  font-weight: 400;
  margin-left: 1rem;
  text-decoration: none;
  transition: 0.2s all;

  &.active {
    color: #845ef7;
    border-right: 2px solid #9775fa;
  }
  :hover {
    color: ${oc.violet[5]};
  }
  ${media.tablet`
    flex: 1 1;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    &.active {
      color: #845ef7;
      border-right: none;
      border-bottom: 2px solid #9775fa;
    }
  `}
`;

const Header = ({ children, pathname }) => {
  return (
    <AppBar>
      <Logo>Rumors</Logo>
      {children}
      <Menu>
        <MenuItem className={`${pathname === "/" ? "active" : ""}`} to="/">
          소식
        </MenuItem>
        <MenuItem
          className={`${pathname === "/mypost" ? "active" : ""}`}
          to="/mypost"
        >
          내 글
        </MenuItem>
        <MenuItem
          className={`${pathname === "/mylike" ? "active" : ""}`}
          to="/mylike"
        >
          내 좋아요
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Header;
