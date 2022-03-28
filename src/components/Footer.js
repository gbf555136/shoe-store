import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import image from "../assests/shoezlogo.svg";

const FooterContainer = styled.div`
  width: 95%;
  margin: 0 auto;
  padding: 1rem 0;
`;
const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid black;
  padding-bottom: 0.5rem;
  ul {
    display: flex;
    list-style-type: none;
  }
`;
const StyledLink = styled(Link)`
  color: ${(props) => props.color};
  &:hover {
    color: ${(props) => props.color};
  }
  i {
    font-size: 2rem;
    padding-right: 1rem;
  }
`;

const FooterTitle = styled.div`
  img {
    width: 50px;
    height: 1.5rem;
    margin-right: 0.5rem;
    object-fit: cover;
  }
  span {
    font-size: 2rem;
    vertical-align: middle;
  }
`;
const FooterBottom = styled.div``;
const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;

  div i {
    padding-right: 0.5rem;
  }
  @media screen and (max-width: 577px) {
    flex-direction: column;
  }
`;
const Footer = () => {
  return (
    <div className="bg-light bg-gradient">
      <FooterContainer>
        <FooterTop>
          <FooterTitle>
            <img src={image} alt="" />
            <span>SHOEZ</span>
          </FooterTitle>
          <ul>
            <li>
              <StyledLink to="/" color="#4267B2">
                <i className="fa-brands fa-facebook"></i>
              </StyledLink>
            </li>
            <li>
              <StyledLink to="/" color="#E1306C">
                <i className="fa-brands fa-instagram"></i>
              </StyledLink>
            </li>
            <li>
              <StyledLink to="/" color="#1D9BF0">
                <i className="fa-brands fa-twitter"></i>
              </StyledLink>
            </li>
            <li>
              <StyledLink to="/" color="green">
                <i className="fa-brands fa-line"></i>
              </StyledLink>
            </li>
          </ul>
        </FooterTop>
        <FooterBottom>
          <p className="fs-4 pb-1">線上型錄僅供參考，實際售價以銷售據點為主</p>
          <BottomRow className="fs-4 pb-1">
            <div>
              <i className="fa-solid fa-phone"></i>
              <span>0800-123-456</span>
            </div>
            <div>
              <i className="fa-solid fa-envelope"></i>
              <span>shoez@gmail.com</span>
            </div>
          </BottomRow>
          <p className="fs-6 d-flex justify-content-center pb-1">
            Copyright © 2022 SHOEZ. All Right Reserved.
          </p>
        </FooterBottom>
      </FooterContainer>
    </div>
  );
};

export default Footer;
