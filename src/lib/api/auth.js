import axios from "axios";

export const checkIdExists = email => axios.get("/api/auth/exists/id/" + email);

export const register = ({ userId, userPw, userName }) =>
  axios.post("/api/auth/register", { userId, userPw, userName });
export const login = ({ userId, userPw }) =>
  axios.post("/api/auth/login", { userId, userPw });

export const checkStatus = () => axios.get("/api/auth/check");
export const logout = () => axios.post("/api/auth/logout");
