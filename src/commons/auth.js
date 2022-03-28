const jwt = "login_jwt";
const nickname = "user_nickname";

const setToken = (token) => {
  localStorage.setItem(jwt, token);
};

const getToken = () => {
  return localStorage.getItem(jwt);
};

const deleteToken = () => {
  localStorage.removeItem(jwt);
};

const getUser = () => {
  return localStorage.getItem(nickname);
};

global.auth = {
  setToken,
  getToken,
  getUser,
  deleteToken,
};
