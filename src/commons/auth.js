const jwt = "login_jwt";
const nickname = "user_nickname";

const setToken = (token) => {
  localStorage.setItem(jwt, token);
};

const setUser = (email) => {
  const nick = email.split("@")[0];
  localStorage.setItem(nickname, nick);
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
  setUser,
  getUser,
  deleteToken,
};
