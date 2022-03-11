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
  flex: 1 1 70px;
`;
const ItemNum = styled.input`
  width: 100%;
  font-size: 1.3rem;
  padding: 0.3rem;
`;
const ItemTotal = styled.p`
  flex: 2 1 100px;
  color: red;
`;

const CartItem = ({ cartItem, getCartItems }) => {
  const cartItemCost = formatPrice(
    Number(cartItem.quantity) * Number(cartItem.product.price)
  );

  const handleNumChange = async (e) => {
    let newQuantity = Number(e.target.value);
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
        <ItemNum
          type="number"
          value={cartItem.quantity}
          min="1"
          max="99"
          onChange={handleNumChange}
        ></ItemNum>
      </ItemNumContainer>
      <ItemTotal>{cartItemCost}</ItemTotal>
    </CartItemContainer>
  );
};

export default CartItem;
