import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ToolWrapper = styled.div`
  width: 90%;
  margin: 0 auto 1rem auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 2px solid black;
`;
const ToolTitle = styled.p`
  font-size: 2rem;
`;
const ToolSearch = styled.div`
  @media screen and (max-width: 577px) {
    display: none;
  }
`;
const SearchInput = styled.input`
  width: 40vw;
  padding: 0.2rem 0.5rem;
  font-size: 1.2rem;
`;
const ClearButton = styled.button`
  font-size: 1.2rem;
  padding: 0.2rem 1rem;
  border-radius: 4px;
`;
const ClearIcon = styled.i``;
const ToolCart = styled(Link)`
  font-size: 1.5rem;
  color: black;
  text-decoration: none;
`;
const CartIcon = styled.i`
  position: relative;
`;
const CartCount = styled.span`
  font-size: 0.5rem;
`;

const ToolBox = ({
  searchInput,
  handleSearchChange,
  handleClearSearch,
  cartsCount,
}) => {
  return (
    <div className="ToolBox">
      <ToolWrapper>
        <ToolTitle>STORE</ToolTitle>
        <ToolSearch>
          <SearchInput
            placeholder="Search"
            value={searchInput}
            onChange={handleSearchChange}
          ></SearchInput>
          <ClearButton
            onClick={handleClearSearch}
            className="bg-secondary text-light"
          >
            <ClearIcon className="fa-solid fa-xmark"></ClearIcon>
          </ClearButton>
        </ToolSearch>
        <ToolCart to="/cart">
          <CartIcon className="fa-solid fa-cart-shopping">
            <CartCount className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cartsCount}
            </CartCount>
          </CartIcon>
        </ToolCart>
      </ToolWrapper>
    </div>
  );
};

export default ToolBox;
