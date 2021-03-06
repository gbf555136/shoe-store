import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import DropdownUser from "./DropdownUser";
import image from "../assests/shoezlogo.svg";

const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  background-color: gray;
  padding: 0.2rem 4rem;
  position: relative;
  @media screen and (max-width: 577px) {
    flex-direction: column;
    padding: 0 0.5rem;
  }
`;
const NavLeft = styled.div`
  a {
    text-decoration: none;
    color: black;
    font-size: 1.5rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    position: relative;
    transition: all 0.3s ease-out;
    img {
      width: 50px;
      height: 1.5rem;
      margin-right: 0.5rem;
      object-fit: cover;
      transition: all 0.3s ease-out;
    }
    &::before {
      content: "";
      position: absolute;
      height: 2px;
      bottom: 0;
      left: 50%;
      right: 50%;
      background-color: white;
      transition: all 0.3s ease-out;
    }
    &:hover {
      color: white;
      &::before {
        left: 0;
        right: 0;
      }
      img {
        filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(39deg)
          brightness(103%) contrast(104%);
      }
    }
  }
`;

const NavRight = styled.div`
  display: flex;
  > ul {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
    li {
      padding-right: 2rem;
      a {
        color: black;
        font-weight: bold;
        position: relative;
        transition: all 0.3s ease-out;
        &::before {
          content: "";
          position: absolute;
          height: 2px;
          bottom: 0;
          left: 50%;
          right: 50%;
          background-color: white;
          transition: all 0.3s ease-out;
        }
        &:hover {
          color: white;
          &::before {
            left: 0;
            right: 0;
          }
        }
      }
    }
  }
  a {
    font-size: 1.5rem;
    color: white;
    text-decoration: none;
  }
  i {
    position: relative;
    color: black;
    transition: all 0.3s ease-out;
    &:hover {
      color: white;
    }
    span {
      font-size: 0.8rem;
      color: white;
      background: red;
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
      padding: 2px 5px;
      border-radius: 50%;
    }
  }
  @media screen and (max-width: 577px) {
    display: ${(props) => !props.extendedNav && "none"};
    flex-direction: column;
    align-items: center;
    padding: 0;
    ul li {
      padding: 0;
    }
  }
`;
const ExtendedNav = styled.div`
  display: none;
  position: absolute;
  right: 0.5rem;
  top: 0;
  @media screen and (max-width: 577px) {
    display: block;
  }
`;

const NavBar = ({ isLogin, setIsLogin, cartsNum }) => {
  const [extendedNav, setExtendedNav] = useState(false);
  return (
    <>
      <NavBarContainer>
        <NavLeft>
          <Link to="/">
            <img src={image} alt="" />
            SHOEZ
          </Link>
        </NavLeft>
        <NavRight extendedNav={extendedNav}>
          <ul>
            <li>
              <Link to="/products">????????????</Link>
            </li>
          </ul>
          <Link to="/cart">
            <i className="fa-solid fa-cart-shopping">
              <span>{cartsNum}</span>
            </i>
          </Link>
          <DropdownUser isLogin={isLogin} setIsLogin={setIsLogin} />
        </NavRight>
        <ExtendedNav onClick={() => setExtendedNav((cur) => !cur)}>
          {extendedNav ? (
            <i className="fa-solid fa-x"></i>
          ) : (
            <i className="fa-solid fa-bars"></i>
          )}
        </ExtendedNav>
      </NavBarContainer>
    </>
  );
};

export default NavBar;
