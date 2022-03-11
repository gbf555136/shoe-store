import React, { useState, useEffect } from "react";
import GlobalStyle from "./theme/globalStyle";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./commons/auth";
import Checkout from "./pages/Checkout";
import "js-loading-overlay";
import "./commons/loadingSetting";
import NavBar from "./components/NavBar";
import { axiosAuth as axios } from "./commons/axios";

const App = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLogin, setIsLogin] = useState(false);

  const initTotalPrice = () => {
    const store_total = sessionStorage.getItem("totalPrice");
    if (store_total) {
      setTotalPrice(Number(store_total));
    }
  };

  const checkLogin = async () => {
    const token = global.auth.getToken();
    if (!token) setIsLogin(false);
    else {
      const resp = await axios.post("/auth/check", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        api_token: token,
      });
      setIsLogin(resp.data.success);
    }
  };

  useEffect(() => {
    initTotalPrice();
    checkLogin();
  }, []);

  return (
    <div>
      <GlobalStyle />
      <NavBar isLogin={isLogin} setIsLogin={setIsLogin} />
      <Routes>
        <Route path="/" element={<Homepage isLogin={isLogin} />} />
        <Route
          path="/cart"
          element={
            <Cart
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
              isLogin={isLogin}
            />
          }
        />
        <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/checkout"
          element={<Checkout totalPrice={totalPrice} />}
        />
      </Routes>
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
    </div>
  );
};

export default App;
