import React from "react";
import homeBackground from "../assests/home-banner.png";
import shoe1 from "../assests/shoe1.jpg";
import shoe2 from "../assests/shoe2.jpg";
import styled, { keyframes } from "styled-components/macro";
import { Link } from "react-router-dom";

import CustomSwiper from "../components/CustomSwiper";

const HomeContainer = styled.div`
  min-height: 90vh;
  margin: 0 auto;
  padding: 0;
`;
const FontAnime = keyframes`
  to {
    transform: translateX(0);
  }
`;
const HomeHeader = styled.div`
  background-image: url(${(props) => props.bg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 70vh;
  p {
    text-align: left;
    padding: 1rem;
    font-size: 2rem;
    font-style: italic;
    font-weight: bold;
    color: #330000;
    right: 0;
    transform: translateX(100%);
    animation: ${FontAnime} 1s ease-out 1 forwards;
    & + p {
      text-align: right;
      transform: translateX(-100%);
      animation: ${FontAnime} 1s ease-out 1 forwards;
    }
    @media screen and (max-width: 577px) {
      font-size: 1.5rem;
    }
  }
`;
const HomeMain = styled.div`
  background-color: #fefbf4;
  padding: 1rem 0;
  * {
    /* border: 1px solid red; */
  }
`;
const MainRow = styled.div`
  display: flex;
  width: 70%;
  margin: 0 auto;
  margin-bottom: 1rem;
  align-items: center;
  &:nth-child(2n) {
    flex-direction: row-reverse;
  }
`;
const MainImg = styled.div`
  width: 40%;
  position: relative;
  padding: 0.3rem;
  background-color: silver;
  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
  @media screen and (max-width: 577px) {
    width: 50%;
    img {
      height: 30vh;
    }
  }
`;
const MainLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  opacity: 0;
  p {
    font-size: 2rem;
    color: white;
  }
  &:hover {
    opacity: 1;
  }
`;
const MainContent = styled.div`
  width: 60%;
  color: #330000;
  h2 {
    text-align: center;
    padding: 0 0.5rem;
    margin: 0;
  }
  @media screen and (max-width: 577px) {
    width: 50%;
  }
`;
const HomeFooter = styled.div`
  text-align: center;
  padding-top: 1rem;
  background-color: #f5f5dc;
`;

const Homepage = () => {
  return (
    <>
      <HomeContainer>
        <HomeHeader bg={homeBackground}>
          <p>玩轉雙腳，引領時尚</p>
          <p>點亮腳下，添翼生活</p>
        </HomeHeader>
        <HomeMain>
          <MainRow>
            <MainImg>
              <img src={shoe1} alt="" />
              <MainLink to="/products">
                <p>瀏覽商品</p>
              </MainLink>
            </MainImg>
            <MainContent>
              <h2>時尚、經典</h2>
            </MainContent>
          </MainRow>
          <MainRow>
            <MainImg>
              <img src={shoe2} alt="" />
              <MainLink to="/products">
                <p>瀏覽商品</p>
              </MainLink>
            </MainImg>
            <MainContent>
              <h2>自由、舒適</h2>
            </MainContent>
          </MainRow>
        </HomeMain>
        <HomeFooter>
          <h2>流行趨勢</h2>
          <CustomSwiper />
        </HomeFooter>
      </HomeContainer>
    </>
  );
};

export default Homepage;
