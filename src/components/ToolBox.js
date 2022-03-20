import React from "react";
import styled from "styled-components";

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
  width: 40%;
  text-align: right;
  @media screen and (max-width: 577px) {
    display: none;
  }
`;
const SearchInput = styled.input`
  width: 80%;
  padding: 0.2rem 0.5rem;
  font-size: 1.2rem;
  border: none;
`;
const ClearButton = styled.button`
  font-size: 1.2rem;
  padding: 0.2rem 0.7rem;
  border-radius: 4px;
  border: none;
  color: black;
  background-color: #d7d7d7;
  i {
  }
  &:hover {
    background-color: #aaa;
    color: white;
  }
`;

const ToolBox = ({ searchInput, handleSearchChange, handleClearSearch }) => {
  return (
    <div className="ToolBox">
      <ToolWrapper>
        <ToolTitle>Products</ToolTitle>
        <ToolSearch>
          <SearchInput
            placeholder="Search.."
            value={searchInput}
            onChange={handleSearchChange}
          ></SearchInput>
          <ClearButton onClick={handleClearSearch}>
            <i className="fa-solid fa-xmark"></i>
          </ClearButton>
        </ToolSearch>
      </ToolWrapper>
    </div>
  );
};

export default ToolBox;
