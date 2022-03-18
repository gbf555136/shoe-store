import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const NavWrapper = styled.div`
  display: flex;
  font-size: 1.5rem;
  background-color: rgb(40, 40, 40);
  justify-content: space-between;
  padding: 0.2rem 2rem 0 2rem;
  margin-bottom: 1rem;
  @media screen and (max-width: 577px) {
    flex-direction: column;
    align-items: center;
    padding: 0;
  }
`;
const NavLeft = styled.div``;
const NavRight = styled.div`
  display: flex;
`;
const NavRightWrapper = styled.div``;
const UserIcon = styled.i`
  margin-left: 2rem;

  color: white;
`;
const UserNickname = styled.span`
  color: gray;
  padding-left: 0.5rem;
`;
const LogoutButton = styled.button`
  background: none;
  border: none;
  color: gray;
  margin-left: 2rem;
  &:hover {
    color: #0a58ca;
  }
`;
const NavLink = styled(Link)`
  text-decoration: none;
  color: gray;
`;

const CartLink = styled(Link)`
  font-size: 1.5rem;
  color: white;
  text-decoration: none;
`;
const CartIcon = styled.i`
  position: relative;
`;
const CartCount = styled.span`
  font-size: 0.5rem;
`;

const NavBar = ({ isLogin, setIsLogin, cartsNum, updateCartsNum }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    global.auth.deleteToken();
    setIsLogin(false);
    Swal.fire({
      icon: "info",
      title: "已登出",
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: 1500,
    });
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 1500);
  };

  return (
    <div className="NavBar">
      <NavWrapper>
        <NavLeft>
          <NavLink to="/">Home</NavLink>
        </NavLeft>
        <NavRight>
          {isLogin ? (
            <NavRightWrapper>
              <CartLink to="/cart">
                <CartIcon className="fa-solid fa-cart-shopping">
                  <CartCount className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartsNum}
                  </CartCount>
                </CartIcon>
              </CartLink>
              <UserIcon className="fa-solid fa-user"></UserIcon>
              <UserNickname>{global.auth.getUser()}</UserNickname>
              <LogoutButton onClick={handleLogout}>登出</LogoutButton>
            </NavRightWrapper>
          ) : (
            <NavRightWrapper>
              <NavLink to="/login">Login</NavLink>
            </NavRightWrapper>
          )}
        </NavRight>
      </NavWrapper>
    </div>
  );
};

export default NavBar;
