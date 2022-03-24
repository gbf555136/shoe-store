import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import axios from "../commons/axios";

const StyledSwiper = styled(Swiper)`
  /* background-color: #fefbf4; */
  min-height: 20vh;
`;
const ProductsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 2rem auto;
  @media screen and (max-width: 577px) {
    justify-content: center;
  }
`;
const SimpleProduct = styled.div`
  a {
    div {
      overflow: hidden;
      border-radius: 50%;
      img {
        width: 300px;
        height: 300px;
      }
    }
    p {
      font-size: 1.3rem;
      padding: 0.5rem 0;
    }
    &:hover {
      color: black;
    }
  }
  @media screen and (max-width: 1023px) {
    &:nth-child(3n) {
      display: none;
    }
  }
  @media screen and (max-width: 577px) {
    &:not(:first-child) {
      display: none;
    }
  }
`;
const CustomSwiper = () => {
  const [allProducts, setAllProducts] = useState([]);
  const getAllProducts = async () => {
    try {
      const resp = await axios.get("/ec/products");
      const result = resp.data.data;
      //   console.log(result);
      setAllProducts(result);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <StyledSwiper
        spaceBetween={50}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        loop={true}
      >
        <SwiperSlide>
          <ProductsContainer>
            {allProducts.slice(0, 3).map((prod) => (
              <SimpleProduct key={prod.id}>
                <Link to={`/productInfo/${prod.id}`}>
                  <div>
                    <img src={prod.imageUrl} alt="" />
                  </div>
                  <p>{`${prod.category} ${prod.title}`}</p>
                </Link>
              </SimpleProduct>
            ))}
          </ProductsContainer>
        </SwiperSlide>
        <SwiperSlide>
          <ProductsContainer>
            {allProducts.slice(3, 6).map((prod) => (
              <SimpleProduct key={prod.id}>
                <Link to={`/productInfo/${prod.id}`}>
                  <div>
                    <img src={prod.imageUrl} alt="" />
                  </div>
                  <p>{`${prod.category} ${prod.title}`}</p>
                </Link>
              </SimpleProduct>
            ))}
          </ProductsContainer>
        </SwiperSlide>
      </StyledSwiper>
    </div>
  );
};

export default CustomSwiper;
