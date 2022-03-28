import React, { useCallback } from "react";
import styled from "styled-components";
import CartItem from "../components/CartItem";
import { useState, useEffect } from "react";
import axios from "../commons/axios";
import formatPrice from "../commons/formatPrice";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const CartContainer = styled.div`
  display: flex;
  width: 90%;
  min-height: 90vh;
  margin: 0 auto;
  flex-direction: column;
  align-items: flex-start;
`;
const Header = styled.div`
  width: 100%;
  padding-bottom: 1rem;
  border-bottom: 3px solid black;
`;
const Title = styled.h2``;
const Main = styled.div`
  width: 100%;
  margin: 1rem 0;
`;
const EmptyMessage = styled.p`
  font-size: 5rem;
  margin: 0 auto;
  text-align: center;
`;
const Footer = styled(Container)``;
const TotalContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const Total = styled.span`
  font-size: 1.5rem;
`;
const TotalPrice = styled.span`
  color: red;
  font-size: 1.5rem;
`;
const CheckoutContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const Cart = ({ totalPrice, setTotalPrice, isLogin, updateCartsNum }) => {
  const [cartItems, setCartItems] = useState([]);

  const calTotalPrice = useCallback(() => {
    if (!cartItems.length) return;
    const itemsCost = cartItems.map(
      (c) => Number(c.product.price) * Number(c.quantity)
    );
    const total = itemsCost.reduce((ac, cv) => ac + cv);
    setTotalPrice(total);
    sessionStorage.setItem("totalPrice", total);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  const getCartItems = async () => {
    if (!isLogin) return;
    try {
      global.JsLoadingOverlay.show();
      const res = await axios.get("/ec/shopping");
      const carts = res.data.data;
      // console.log(carts);
      global.JsLoadingOverlay.hide();
      setCartItems(carts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  useEffect(() => {
    calTotalPrice();
    updateCartsNum();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  return (
    <div className="Cart pt-2">
      <CartContainer>
        <Header>
          <Title>Shopping Cart</Title>
        </Header>
        <Main>
          {!cartItems.length && <EmptyMessage>It's Empty</EmptyMessage>}
          {cartItems.map((c) => (
            <CartItem
              key={c.product.id}
              cartItem={c}
              getCartItems={getCartItems}
            />
          ))}
        </Main>
        {!!cartItems.length && (
          <Footer>
            <TotalContainer>
              <Total>總額：</Total>
              <TotalPrice>NT{formatPrice(totalPrice)}</TotalPrice>
            </TotalContainer>
            <CheckoutContainer>
              <Link
                to="/products"
                className="btn btn-primary btn-lg align-self-end"
              >
                繼續選購
              </Link>
              <Link
                to="/checkout"
                className="btn btn-success btn-lg align-self-end ms-3"
              >
                確定購買
              </Link>
            </CheckoutContainer>
          </Footer>
        )}
      </CartContainer>
    </div>
  );
};

export default Cart;
