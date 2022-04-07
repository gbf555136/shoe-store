import React, { useState, useEffect } from "react";
import GlobalStyle from "./theme/globalStyle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import "./commons/auth";
import Checkout from "./pages/Checkout";
import "js-loading-overlay";
import "./theme/loadingSetting";
import NavBar from "./components/NavBar";
import axios, { axiosAuth } from "./commons/axios";
import ProductInfo from "./pages/ProductInfo";
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer";

const App = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [cartsNum, setCartsNum] = useState(0);

  const initTotalPrice = () => {
    const store_total = sessionStorage.getItem("totalPrice");
    if (store_total) {
      setTotalPrice(Number(store_total));
    }
  };

  const checkLogin = async () => {
    const token = global.auth.getToken();
    if (!token) {
      setIsLogin(false);
      return;
    }
    try {
      const resp = await axiosAuth.post("/auth/check", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        api_token: token,
      });
      setIsLogin(resp.data.success);
    } catch (e) {
      console.log(e);
    }
  };

  const updateCartsNum = async () => {
    if (!isLogin) {
      setCartsNum(0);
      return;
    }
    try {
      const res = await axios.get("/ec/shopping");
      const carts = res.data.data;
      if (!carts.length) {
        setCartsNum(0);
        return;
      }
      const cartsNumArr = carts.map((c) => Number(c.quantity));
      const newCartsNum = cartsNumArr.reduce((ac, cv) => ac + cv);
      setCartsNum(newCartsNum);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    initTotalPrice();
    checkLogin();
  }, []);

  useEffect(() => {
    updateCartsNum();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  return (
    <div>
      <GlobalStyle />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      <NavBar
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        cartsNum={cartsNum}
        updateCartsNum={updateCartsNum}
      />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route
          path="/products"
          element={
            <Products isLogin={isLogin} updateCartsNum={updateCartsNum} />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
              isLogin={isLogin}
              updateCartsNum={updateCartsNum}
            />
          }
        />
        <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
        <Route
          path="/checkout"
          element={<Checkout totalPrice={totalPrice} />}
        />
        <Route
          path="/productInfo/:productID"
          element={
            <ProductInfo isLogin={isLogin} updateCartsNum={updateCartsNum} />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

// import { CSSTransition } from "react-transition-group";

// function App() {
//   const [inProp, setInProp] = useState(false);
//   return (
//     <div>
//       <CSSTransition in={inProp} timeout={200} classNames="my-node">
//         <div>{"I'll receive my-node-* classes"}</div>
//       </CSSTransition>
//       <button type="button" onClick={() => setInProp(true)}>
//         Click to Enter
//       </button>
//     </div>
//   );
// }
// export default App;
