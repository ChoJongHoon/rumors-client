import React from "react";
import styled from "styled-components";
import { shadow, media } from "lib/styleUtils";
import oc from "open-color";

const Background = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #000;
  opacity: 0.6;
  z-index: 1;
`;

const Popup = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  width: 80%;
  max-height: 90%;
  overflow: hidden;
  background: #fff;
  z-index: 2;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  ${shadow(4)}
  ${media.tablet`
    width: 95%;
  `}
`;

const Header = styled.div`
  width: 100%;
  height: 4rem;
  background: ${oc.violet[7]};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const Button = styled.div`
    padding-left: .5rem;
    padding-right: .5rem;
    padding-top: .25rem;
    padding-bottom: .25rem;
    margin: .9rem;
    font-weight: 600;
    font-size: 1.25rem;
    color: ${oc.gray[1]}
    cursor: pointer;
    user_select: none;
    display: inline-flex;
    border: 2px solid ${oc.gray[1]}
    border-radius: 2px;
    :hover{
        background: rgba(255,255,255,0.85);
        color: ${oc.violet[6]}
        ${shadow(1)}
    }
    :active{
        background: ${oc.gray[6]}
        border: 2px solid rgba(255,255,255,0.85);
    }
    &.right{
      float: right;
    }
`;

const Modal = ({ handleClose, btnText, handleSubmit, children }) => {
  return (
    <>
      <Background onClick={handleClose} />
      <Popup>
        <Header>
          <Button onClick={handleClose}>뒤로가기</Button>
          {btnText ? (
            <Button className="right" onClick={handleSubmit}>
              {btnText}
            </Button>
          ) : null}
        </Header>
        {children}
      </Popup>
    </>
  );
};

export default Modal;
