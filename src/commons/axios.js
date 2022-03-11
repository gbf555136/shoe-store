import axios from "axios";

const axiosShop = axios.create({
  baseURL:
    "https://course-ec-api.hexschool.io/api/cc24856f-54bf-448d-90f8-e02b2b40f3a5",
  timeout: 4000,
});

const axiosAuth = axios.create({
  baseURL: "https://course-ec-api.hexschool.io/api/",
  timeout: 4000,
});
export default axiosShop;
export { axiosAuth };
