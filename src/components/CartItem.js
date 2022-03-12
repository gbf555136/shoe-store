import React from "react";
import styled from "styled-components";
import axios from "../commons/axios";
import formatPrice from "../commons/formatPrice";
import { toast } from "react-toastify";

const CartItemContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  background-color: white;
  text-align: center;
  font-size: 1.3rem;
`;
const ItemCancelContainer = styled.div`
  flex: 1 1 20px;
`;
const ItemCancel = styled.button`
  background-color: white;
  border: none;
  cursor: pointer;
  font-size: 1.3rem;
  padding: 0.5rem;
`;
const ItemImgContainer = styled.div`
  flex: 2 1 80px;
`;
const ItemImg = styled.img`
  width: 100%;
`;
const ItemName = styled.p`
  flex: 4 1 200px;
`;
const ItemPrice = styled.p`
  flex: 2 1 120px;
`;
const ItemNumContainer = styled.div`
  flex: 0 1 120px;
  display: flex;
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
  flex: 2 1 100px;
  color: red;
`;

const CartItem = ({ cartItem, getCartItems }) => {
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

  const handleButtonClick = async (e) => {
    try {
      await axios.delete(`/ec/shopping/${cartItem.product.id}`);
      await getCartItems();
      toast.success("移除成功");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CartItemContainer>
      <ItemCancelContainer>
        <ItemCancel
          className="fa-solid fa-xmark"
          onClick={handleButtonClick}
        ></ItemCancel>
      </ItemCancelContainer>
      <ItemImgContainer>
        <ItemImg src={cartItem.product.imageUrl}></ItemImg>
      </ItemImgContainer>
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
  );
};

export default CartItem;
