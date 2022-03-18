import React from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import axios from "../commons/axios";
import formatPrice from "../commons/formatPrice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ProductWrapper = styled.div`
  padding-bottom: 1rem;
`;
const ProductContainer = styled.div`
  background-color: #d6d6d6;
  margin: 0 auto;
  padding: 0.5rem;
`;
const ProductTop = styled.div`
  display: flex;
  flex-direction: column;
`;
const ProductImgWrapper = styled(Link)`
  width: 100%;
  overflow: hidden;
`;
const ProductImg = styled.img`
  display: block;
  width: 100%;
  object-fit: cover;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.2);
  }
`;
const ProductName = styled.p`
  margin: 0.5rem 0 0.1rem 0;
  font-size: 1.2rem;
`;
const ProductBrand = styled.p`
  font-size: 0.8rem;
  color: grey;
`;
const ProductBot = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ProductPrice = styled.p`
  font-size: 1.1rem;
`;
const ProductCartButton = styled.button`
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  background-color: #eee;
  color: #8f8c8c;
  transition: all 0.2s;
  &:hover {
    background-color: #333;
    color: #fff;
  }
`;
const ProductCart = styled.i``;

const Product = ({ productInfo, updateCartsNum, isLogin }) => {
  const productPrice = formatPrice(productInfo.price);
  const navigate = useNavigate();

  const addCart = async () => {
    if (!isLogin) {
      Swal.fire({
        icon: "warning",
        title: "請先登入",
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 1500,
      });
      setTimeout(() => navigate("/login"), 1500);
      return;
    }
    try {
      global.JsLoadingOverlay.show();
      const res = await axios.get("/ec/shopping");
      const allCartItem = res.data.data;
      const isCartItemExist =
        allCartItem.findIndex((cart) => cart.product.id === productInfo.id) !==
        -1;
      if (isCartItemExist) {
        toast.error(`已在購物車內`);
      } else {
        const res = await axios.post("/ec/shopping", {
          product: productInfo.id,
          quantity: 1,
        });
        console.log(res);
        toast.success(`加入購物車`);
        updateCartsNum();
      }
      global.JsLoadingOverlay.hide();
    } catch (err) {
      console.log(err);
      toast.error(`發生錯誤，稍後在試`);
    }
  };

  return (
    <ProductWrapper className="col-12 col-sm-6 col-md-4 col-lg-3">
      <ProductContainer>
        <ProductTop>
          <ProductImgWrapper to={`/productInfo/${productInfo.id}`}>
            <ProductImg src={productInfo.imageUrl[0]}></ProductImg>
          </ProductImgWrapper>
          <ProductName>{productInfo.title}</ProductName>
          <ProductBrand>{productInfo.category}</ProductBrand>
        </ProductTop>
        <ProductBot>
          <ProductPrice>NT{productPrice}</ProductPrice>
          <ProductCartButton onClick={addCart}>
            <ProductCart className="fa-solid fa-cart-plus"></ProductCart>
          </ProductCartButton>
        </ProductBot>
      </ProductContainer>
    </ProductWrapper>
  );
};

export default Product;
