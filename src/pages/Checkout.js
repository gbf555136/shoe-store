import styled from "styled-components";
import formatPrice from "../commons/formatPrice";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "../commons/axios";
import { useNavigate } from "react-router-dom";

const SmContainer = styled.div`
  max-width: 60%;
`;
const FormContainer = styled.div``;
const TotalContainer = styled.div`
  align-self: flex-end;
  margin-bottom: 0.5rem;
`;
const Total = styled.span`
  font-size: 1.5rem;
`;
const TotalPrice = styled.span`
  color: red;
  font-size: 1.5rem;
`;
const ButtonContainer = styled.div`
  align-self: flex-end;
`;
const Checkout = ({ totalPrice }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("/ec/orders", data);
      Swal.fire({
        icon: "success",
        title: "付款成功",
        text: "感謝您的購買!",
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 1500,
      });
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SmContainer className="container">
      <FormContainer>
        <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
          <div className="form-group mb-2">
            <label htmlFor="name">姓名：</label>
            <input
              type="text"
              className="form-control"
              id="name"
              aria-describedby="name"
              placeholder="請輸入姓名"
              {...register("name", { required: true })}
            ></input>
            {errors.name && (
              <span className="text-danger ms-2">姓名為必填 *</span>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="email">E-mail：</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="email"
              placeholder="請輸入E-mail"
              {...register("email", { required: true })}
            ></input>
            {errors.email && (
              <span className="text-danger ms-2">E-mail為必填 *</span>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="tel">電話：</label>
            <input
              type="tel"
              className="form-control"
              id="tel"
              aria-describedby="tel"
              placeholder="請輸入電話"
              {...register("tel", { required: true })}
            ></input>
            {errors.tel && (
              <span className="text-danger ms-2">電話為必填 *</span>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="address">地址：</label>
            <input
              type="text"
              className="form-control"
              id="address"
              aria-describedby="address"
              placeholder="請輸入地址"
              {...register("address", { required: true })}
            ></input>
            {errors.address && (
              <span className="text-danger ms-2">地址為必填 *</span>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="payment">付款方式：</label>
            <select
              className="custom-select form-control"
              id="payment"
              defaultValue=""
              {...register("payment", { required: true })}
            >
              <option value="" disabled>
                請選擇付款方式：
              </option>
              <option value="Credit">Credit</option>
              <option value="WebATM">WebATM</option>
              <option value="GooglePay">GooglePay</option>
            </select>
            {errors.payment && (
              <span className="text-danger ms-2">付款方式為必填 *</span>
            )}
          </div>
          <TotalContainer>
            <Total>總額：</Total>
            <TotalPrice>NT{formatPrice(totalPrice)}</TotalPrice>
          </TotalContainer>
          <ButtonContainer>
            <Link to="/cart" className="btn btn-primary btn-lg align-self-end">
              上一頁
            </Link>
            <button
              className="btn btn-success btn-lg align-self-end ms-3"
              type="submit"
            >
              結帳
            </button>
          </ButtonContainer>
        </form>
      </FormContainer>
    </SmContainer>
  );
};

export default Checkout;
