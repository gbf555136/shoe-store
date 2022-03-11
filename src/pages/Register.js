import React from "react";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "../commons/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const CustomInput = styled(Form.Control)`
  border-color: ${(props) => props.bc};
`;

const CustomText = styled(Form.Text)`
  color: red !important;
  font-weight: bold;
`;

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const emailEmpty = errors.email ? "#ff0000" : "#ced4da";
  const pwEmpty = errors.password ? "#ff0000" : "#ced4da";
  const nickNameEmpty = errors.nickname ? "#ff0000" : "#ced4da";

  const formSubmit = async (data) => {
    const { email, nickname, password } = data;
    try {
      const res = await axios.post("/auth/register", {
        email,
        nickname,
        password,
        type: 0,
      });
      const token = res.data;
      global.auth.setToken(token);
      toast.success("Register Success");
      navigate("/");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="Login">
      <LoginContainer>
        <Form onSubmit={handleSubmit(formSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <CustomInput
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                  message: "Please input valid email",
                },
              })}
              bc={emailEmpty}
            />
            {errors.email && (
              <CustomText className="text-muted">
                {errors.email.message}
              </CustomText>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicNickname">
            <Form.Label>Nickname</Form.Label>
            <CustomInput
              type="text"
              placeholder="Enter Nickname"
              {...register("nickname", {
                required: {
                  value: true,
                  message: "Nickname is required",
                },
                minLength: {
                  value: 4,
                  message: "Nickname cannot be less than 4 digits",
                },
              })}
              bc={nickNameEmpty}
            />
            {errors.nickname && (
              <CustomText className="text-muted">
                {errors.nickname.message}
              </CustomText>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <CustomInput
              type="password"
              placeholder="Password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
                minLength: {
                  value: 6,
                  message: "Password cannot be less than 6 digits",
                },
              })}
              bc={pwEmpty}
            />
            {errors.password && (
              <CustomText className="text-muted">
                {errors.password.message}
              </CustomText>
            )}
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </LoginContainer>
    </div>
  );
};

export default Register;
