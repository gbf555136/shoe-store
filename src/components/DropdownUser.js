import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const DropdownContainer = styled.div`
  position: relative;
  color: black;
  width: 100px;
  text-align: center;
  cursor: pointer;
  &:hover {
    color: black;
    ul {
      opacity: 1;
      pointer-events: all;
      transform: translateY(0px);
    }
  }

  ul {
    list-style-type: none;
    padding: 0;
    padding-top: 5px;
    position: absolute;
    left: 0;
    opacity: 0;
    pointer-events: none;
    text-align: center;
    width: 100px;
    z-index: 1;
    transition: all 0.3s ease;
    transform: translateY(-20px);
    li {
      background-color: rgb(40, 40, 40);
      border-radius: 10px;
      border-bottom: 2px solid white;
      &:hover {
        text-decoration: underline;
      }
      a {
        color: white;
      }
      button {
        background: none;
        border: none;
        color: white;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

const DropdownUser = ({ isLogin, setIsLogin }) => {
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
    <>
      <DropdownContainer>
        {isLogin ? (
          <i className="fa-solid fa-user"></i>
        ) : (
          <i className="fa-solid fa-right-to-bracket"></i>
        )}
        <ul>
          <li>
            {isLogin ? (
              <button onClick={handleLogout}>登出</button>
            ) : (
              <Link to="/login">登入</Link>
            )}
          </li>
        </ul>
      </DropdownContainer>
    </>
  );
};

export default DropdownUser;
