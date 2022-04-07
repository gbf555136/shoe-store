import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "../commons/axios";
import formatPrice from "../commons/formatPrice";
import { toast } from "react-toastify";
import { CSSTransition } from "react-transition-group";

const CartItemContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  text-align: center;
  font-size: 1.3rem;
  position: relative;
  opacity: 0;
  &.fade-enter {
    opacity: 0;
    transform: translate(100px, 0);
  }
  &.fade-enter-active {
    opacity: 1;
    transform: translate(0, 0);
    transition: all 400ms ease-out;
  }
  &.fade-enter-done {
    opacity: 1;
  }
  &.fade-appear {
    opacity: 0;
    transform: translate(100px, 0);
  }
  &.fade-appear-active {
    opacity: 1;
    transform: translate(0, 0);
    transition: all 400ms ease;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
    transform: translate(-100px, 0);
    transition: all 0.5s ease;
  }
  &.fade-exit-done {
    opacity: 0;
    transform: translate(-100%, 0);
  }
  @media screen and (max-width: 577px) {
    flex-direction: column;
  }
`;
const ItemHeader = styled.div`
  flex: 3 1 0;
  display: flex;
  align-items: center;
`;
const ItemCancelContainer = styled.div``;
const ItemCancel = styled.button`
  background-color: white;
  border: none;
  cursor: pointer;
  font-size: 1.3rem;
  padding: 0.5rem;
  @media screen and (max-width: 577px) {
    font-size: 2rem;
  }
`;
const ItemImgContainer = styled.div``;
const ItemImg = styled.img`
  width: 100%;
`;
const ItemName = styled.p`
  flex: 4 1 0;
  @media screen and (max-width: 577px) {
    flex: 1 1 0;
  }
`;
const ItemPrice = styled.p`
  flex: 2 1 0;
  @media screen and (max-width: 577px) {
    flex: 1 1 0;
    padding-top: 0.5rem;
  }
`;
const ItemNumContainer = styled.div`
  flex: 0 1 120px;
  display: flex;
  @media screen and (max-width: 577px) {
    flex: 1 1 0;
    padding-top: 0.5rem;
  }
`;
const ItemNum = styled.input`
  width: 100%;
  font-size: 1.3rem;
  padding: 0.2rem 0.3rem;
  text-align: center;
  background-color: #e9ecef;
  border: none;
  pointer-events: none;
`;
const ItemTotal = styled.p`
  flex: 2 1 0;
  color: red;
  @media screen and (max-width: 577px) {
    flex: 1 1 0;
    padding-top: 0.5rem;
  }
`;

const CartItem = ({ cartItem, getCartItems, showDelay }) => {
  const [show, setShow] = useState();
  const cartItemCost = formatPrice(
    Number(cartItem.quantity) * Number(cartItem.product.price)
  );

  const updateQuantity = async (newQuantity) => {
    if (newQuantity < 1 || newQuantity > 99) {
      return;
    }
    const updateCartItem = {
      product: cartItem.product.id,
      quantity: newQuantity,
    };
    try {
      await axios.patch("/ec/shopping", updateCartItem);
      await getCartItems();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelClick = async (e) => {
    setShow((prev) => !prev);
    try {
      await axios.delete(`/ec/shopping/${cartItem.product.id}`);
      await getCartItems();
      toast.success("移除成功");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setTimeout(() => setShow(true), showDelay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <CSSTransition in={show} timeout={400} classNames="fade">
      <CartItemContainer>
        <ItemHeader>
          <ItemCancelContainer>
            <ItemCancel
              className="fa-solid fa-xmark"
              onClick={handleCancelClick}
            ></ItemCancel>
          </ItemCancelContainer>
          <ItemImgContainer>
            <ItemImg src={cartItem.product.imageUrl}></ItemImg>
          </ItemImgContainer>
        </ItemHeader>
        <ItemName>{cartItem.product.title}</ItemName>
        <ItemPrice>{formatPrice(cartItem.product.price)}</ItemPrice>
        <ItemNumContainer>
          <button
            className="btn btn-outline-secondary"
            onClick={() => {
              updateQuantity(cartItem.quantity - 1);
            }}
          >
            -
          </button>
          <ItemNum
            type="number"
            value={cartItem.quantity}
            min="1"
            max="99"
            readOnly
          ></ItemNum>
          <button
            className="btn btn-outline-secondary"
            onClick={() => {
              updateQuantity(cartItem.quantity + 1);
            }}
          >
            +
          </button>
        </ItemNumContainer>
        <ItemTotal>{cartItemCost}</ItemTotal>
      </CartItemContainer>
    </CSSTransition>
  );
};

export default CartItem;
