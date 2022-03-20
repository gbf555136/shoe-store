import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import DropdownUser from "./DropdownUser";
import image from "../assests/shoezlogo.svg";

const NavBarContainer = styled.div`
  display: flex;
  font-size: 1.5rem;
  background-color: gray;
  justify-content: space-between;
  padding: 0.2rem 8rem 0 8rem;
  margin-bottom: 1rem;
  @media screen and (max-width: 577px) {
    flex-direction: column;
    align-items: center;
    padding: 0;
  }
`;
const NavLeft = styled.div`
  a {
    text-decoration: none;
    color: black;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    &:hover {
      color: white;
    }
    img {
      width: 50px;
      height: 1.5rem;
      margin-right: 0.5rem;
      object-fit: cover;
    }
  }
`;
const NavRight = styled.div`
  display: flex;
  a {
    font-size: 1.5rem;
    color: white;
    text-decoration: none;
  }
  i {
    position: relative;
    color: black;
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
`;

const NavBar = ({ isLogin, setIsLogin, cartsNum }) => {
  return (
    <>
      <NavBarContainer>
        <NavLeft>
          <Link to="/">
            <img src={image} alt="" />
            SHOEZ
          </Link>
        </NavLeft>
        <NavRight>
          <Link to="/cart">
            <i className="fa-solid fa-cart-shopping">
              <span>{cartsNum}</span>
            </i>
          </Link>
          <DropdownUser isLogin={isLogin} setIsLogin={setIsLogin} />
        </NavRight>
      </NavBarContainer>
    </>
  );
};

export default NavBar;
