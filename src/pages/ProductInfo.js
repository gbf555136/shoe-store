import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../commons/axios";
import formatPrice from "../commons/formatPrice";
import styled from "styled-components";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductContainer = styled.div`
  min-height: 80vh;
  align-items: center;
  display: flex;
`;
const ProductRow = styled.div``;
const ProductImgContainer = styled.div`
  border-radius: 10px;
  overflow: hidden;
  padding: 0;
`;
const ProductImg = styled.img`
  width: 100%;
  object-fit: contain;
`;
const ProductContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Title = styled.h2`
  margin-top: 0.5rem;
`;
const Description = styled.p`
  font-size: 1.3rem;
  margin: 0.5rem 0;
`;
const Price = styled.p`
  align-self: flex-end;
  font-size: 1.3rem;
`;
const Total = styled.p`
  align-self: flex-end;
  font-size: 1.3rem;
`;
const CartContainer = styled.div``;
const NumContainer = styled.div`
  display: flex;
`;
const Num = styled.input`
  flex: 1 1 0;
  font-size: 1.3rem;
  padding: 0.2rem 0.3rem;
  text-align: center;
  background-color: #e9ecef;
  border: none;
  pointer-events: none;
`;
const Numbutton = styled.button`
  flex: 1 1 0;
  box-shadow: none !important;
`;
const CartButton = styled.button`
  @media screen and (max-width: 769px) {
    margin: 1rem 0;
  }
`;

const ProductInfo = ({ isLogin, updateCartsNum }) => {
  const { productID } = useParams();
  const [product, setProduct] = useState({});
  const [productNum, setProductNum] = useState(1);
  const total = productNum * product.price;
  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      global.JsLoadingOverlay.show();
      const resp = await axios.get(`/ec/product/${productID}`);
      global.JsLoadingOverlay.hide();
      const result = resp.data.data;
      setProduct(result);
    } catch (err) {
      console.log(err);
    }
  };

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
        allCartItem.findIndex((cart) => cart.product.id === product.id) !== -1;
      if (isCartItemExist) {
        toast.error(`已在購物車內`);
      } else {
        await axios.post("/ec/shopping", {
          product: productID,
          quantity: productNum,
        });
        toast.success(`加入購物車`);
        updateCartsNum();
      }
      global.JsLoadingOverlay.hide();
    } catch (err) {
      console.log(err);
      toast.error(`發生錯誤，稍後在試`);
    }
  };

  const handleNumChange = (num) => {
    if (num < 1 || num > 99) return;
    setProductNum(num);
  };
  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ProductInfo">
      <ProductContainer className="container">
        <ProductRow className="row">
          <ProductImgContainer className="col-md-5">
            <ProductImg src={product.imageUrl}></ProductImg>
          </ProductImgContainer>
          <ProductContentContainer className="col-md-7">
            <Title>{product.description}</Title>
            <Description>{product.content}</Description>
            <Price>價格：{formatPrice(product.price)}</Price>
            <Total>小計：{formatPrice(total)}</Total>
            <CartContainer className="row">
              <NumContainer className="col-md-6">
                <Numbutton
                  className="btn btn-outline-success"
                  onClick={() => {
                    handleNumChange(productNum - 1);
                  }}
                >
                  -
                </Numbutton>
                <Num
                  type="number"
                  value={productNum}
                  min="1"
                  max="99"
                  readOnly
                ></Num>
                <Numbutton
                  className="btn btn-outline-success"
                  onClick={() => {
                    handleNumChange(productNum + 1);
                  }}
                >
                  +
                </Numbutton>
              </NumContainer>
              <CartButton
                className="btn btn-primary col-md-6 "
                onClick={addCart}
              >
                加入購物車
              </CartButton>
            </CartContainer>
          </ProductContentContainer>
        </ProductRow>
      </ProductContainer>
    </div>
  );
};

export default ProductInfo;
