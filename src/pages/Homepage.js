import React from "react";
import ToolBox from "../components/ToolBox";
import Product from "../components/Product";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "../commons/axios";

const ProductsWrapper = styled.div`
  max-width: 1140px;
  min-height: 90vh;
  margin: 0 auto;
  padding: 0 1rem;
`;

const EmptyMessage = styled.p`
  font-size: 5rem;
  margin: 0 auto;
  text-align: center;
  line-height: 90vh;
  user-select: none;
`;

const Homepage = ({ isLogin, cartsNum, updateCartsNum }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [currenctProducts, setCurrentProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const getAllProducts = async () => {
    try {
      global.JsLoadingOverlay.show();
      const resp = await axios.get("/ec/products");
      global.JsLoadingOverlay.hide();
      const result = resp.data.data;
      // console.log(result);
      setAllProducts(result);
      setCurrentProducts(result);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearchChange = (e) => {
    const newSearchInput = e.target.value;
    const searchProducts = allProducts.filter((p) => {
      return (
        p.title.toLowerCase().includes(newSearchInput.toLowerCase()) ||
        p.category.toLowerCase().includes(newSearchInput.toLowerCase())
      );
    });
    setSearchInput(newSearchInput);
    setCurrentProducts(searchProducts);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setCurrentProducts(allProducts);
  };

  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Homepage">
      <ToolBox
        searchInput={searchInput}
        handleSearchChange={handleSearchChange}
        handleClearSearch={handleClearSearch}
      />
      <div className="Products">
        <ProductsWrapper>
          <div className="row">
            {currenctProducts.map((p) => (
              <Product
                key={p.id}
                productInfo={p}
                updateCartsNum={updateCartsNum}
                isLogin={isLogin}
              />
            ))}
            {!currenctProducts.length && (
              <EmptyMessage>No Results</EmptyMessage>
            )}
          </div>
        </ProductsWrapper>
      </div>
    </div>
  );
};

export default Homepage;
