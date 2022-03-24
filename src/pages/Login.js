import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { axiosAuth as axios } from "../commons/axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SmContainer = styled.div`
  max-width: 60%;
  min-height: 90vh;
  padding: 1rem 0;
`;
const FormContainer = styled.div``;

const Login = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/auth/login", data);
      // console.log(res);
      const token = res.data.token;
      global.auth.setToken(token);
      global.auth.setUser(data.email);
      setIsLogin(true);
      Swal.fire({
        icon: "success",
        title: "已登入",
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 1500,
      });
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "帳號密碼錯誤",
        showConfirmButton: true,
        timer: 1500,
      });
    }
  };

  return (
    <SmContainer className="container">
      <FormContainer>
        <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
          <div className="form-group mb-2">
            <label htmlFor="email">帳號：</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="email"
              placeholder="請輸入E-mail"
              {...register("email", { required: true })}
            ></input>
            {errors.email && (
              <span className="text-danger ms-2">帳號為必填 *</span>
            )}
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password">密碼：</label>
            <input
              type="password"
              className="form-control"
              id="password"
              aria-describedby="password"
              placeholder="請輸入密碼"
              {...register("password", { required: true })}
            ></input>
            {errors.password && (
              <span className="text-danger ms-2">密碼為必填 *</span>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            登入
          </button>
        </form>
      </FormContainer>
    </SmContainer>
  );
};

export default Login;
